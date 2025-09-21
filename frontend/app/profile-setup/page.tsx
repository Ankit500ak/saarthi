"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, ArrowLeft, Save, User, GraduationCap, MapPin, Phone, Mail, Building, FileText } from "lucide-react"

interface ProfileSetupProps {
  isFirstTime?: boolean
  onComplete?: () => void
}

function ProfileSetup({ isFirstTime = false, onComplete }: ProfileSetupProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    // Pre-populated from registration
    username: "",
    email: "",
    
    // Additional profile fields
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    
    // Education
    collegeName: "",
    degree: "",
    branch: "",
    yearOfStudy: "",
    cgpa: "",
    graduationYear: "",
    
    // Location
    city: "",
    state: "",
    country: "India",
    
    // Professional
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
    portfolio: "",
    
    // Profile picture
    profilePicture: null as File | null,
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [userLoaded, setUserLoaded] = useState(false)

  // Load existing user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/users/me/", {
          credentials: "include",
        })
        if (res.ok) {
          const userData = await res.json()
          setFormData(prev => ({
            ...prev,
            username: userData.username || "",
            email: userData.email || "",
            firstName: userData.first_name || "",
            lastName: userData.last_name || "",
            phone: userData.phone || "",
            city: userData.city || "",
            state: userData.state || "",
            bio: userData.bio || "",
            skills: userData.skills || "",
            collegeName: userData.college_name || "",
            degree: userData.degree || "",
            branch: userData.branch || "",
            yearOfStudy: userData.year_of_study || "",
            cgpa: userData.cgpa || "",
            graduationYear: userData.graduation_year || "",
            github: userData.github || "",
            linkedin: userData.linkedin || "",
            portfolio: userData.portfolio || "",
            dateOfBirth: userData.date_of_birth || "",
            gender: userData.gender || "",
          }))
        }
        setUserLoaded(true)
      } catch (error) {
        console.error("Failed to fetch user data:", error)
        setUserLoaded(true)
      }
    }

    fetchUserData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: file,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const profileData = new FormData()
      
      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'profilePicture' && value instanceof File) {
          profileData.append(key, value)
        } else if (value && typeof value === 'string') {
          profileData.append(key, value)
        }
      })

      const res = await fetch("http://localhost:8000/api/users/profile/", {
        method: "POST",
        body: profileData,
        credentials: "include",
      })

      const data = await res.json()
      
      if (res.ok) {
        if (onComplete) {
          onComplete()
        } else {
          router.push("/dashboard")
        }
      } else {
        alert(data.error || "Profile update failed")
      }
    } catch (err) {
      alert("An error occurred. Please try again.")
    }
    
    setIsLoading(false)
  }

  if (!userLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className={cn(
      "min-h-screen bg-black p-4",
      !isFirstTime && "min-h-0 bg-transparent p-0"
    )}>
      {/* Back button - only show for standalone page */}
      {!isFirstTime && !onComplete && (
        <Link
          href="/dashboard"
          className="fixed top-6 left-6 z-20 text-zinc-400 hover:text-[#e78a53] transition-colors duration-200 flex items-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>
      )}

      {/* Background gradient - only for standalone page */}
      {(isFirstTime || !onComplete) && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#e78a53]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#e78a53]/5 rounded-full blur-3xl" />
        </>
      )}

      <div className={cn(
        "relative z-10 max-w-4xl mx-auto",
        isFirstTime || !onComplete ? "pt-20" : "pt-4"
      )}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isFirstTime ? "Complete Your Profile" : "Edit Profile"}
          </h1>
          <p className="text-zinc-400">
            {isFirstTime 
              ? "Let's set up your profile to get personalized internship recommendations"
              : "Update your profile information"
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-zinc-900/50 backdrop-blur-xl border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Picture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24 border-4 border-[#e78a53]/20">
                    <AvatarImage src={formData.profilePicture ? URL.createObjectURL(formData.profilePicture) : ""} />
                    <AvatarFallback className="text-xl bg-[#e78a53]/10 text-[#e78a53]">
                      {formData.firstName && formData.lastName 
                        ? `${formData.firstName[0]}${formData.lastName[0]}`
                        : formData.username.slice(0, 2).toUpperCase()
                      }
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Label htmlFor="profilePicture" className="text-white cursor-pointer">
                      <div className="flex items-center gap-2 bg-[#e78a53]/10 hover:bg-[#e78a53]/20 border border-[#e78a53]/30 rounded-lg px-4 py-2 transition-colors">
                        <Upload className="w-4 h-4" />
                        Upload Photo
                      </div>
                    </Label>
                    <Input
                      id="profilePicture"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <p className="text-xs text-zinc-500 mt-2">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-zinc-900/50 backdrop-blur-xl border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-white">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="gender" className="text-white">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                      <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white focus:border-[#e78a53] focus:ring-[#e78a53]/20">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-zinc-900/50 backdrop-blur-xl border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="collegeName" className="text-white">College/University Name</Label>
                    <Input
                      id="collegeName"
                      name="collegeName"
                      value={formData.collegeName}
                      onChange={handleChange}
                      placeholder="IIT Delhi"
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="degree" className="text-white">Degree</Label>
                    <Select value={formData.degree} onValueChange={(value) => handleSelectChange("degree", value)}>
                      <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white focus:border-[#e78a53] focus:ring-[#e78a53]/20">
                        <SelectValue placeholder="Select degree" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="btech">B.Tech</SelectItem>
                        <SelectItem value="be">B.E.</SelectItem>
                        <SelectItem value="bsc">B.Sc</SelectItem>
                        <SelectItem value="bca">BCA</SelectItem>
                        <SelectItem value="mtech">M.Tech</SelectItem>
                        <SelectItem value="me">M.E.</SelectItem>
                        <SelectItem value="msc">M.Sc</SelectItem>
                        <SelectItem value="mca">MCA</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch" className="text-white">Branch/Specialization</Label>
                    <Input
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      placeholder="Computer Science"
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearOfStudy" className="text-white">Current Year</Label>
                    <Select value={formData.yearOfStudy} onValueChange={(value) => handleSelectChange("yearOfStudy", value)}>
                      <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white focus:border-[#e78a53] focus:ring-[#e78a53]/20">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                        <SelectItem value="5">5th Year</SelectItem>
                        <SelectItem value="graduated">Graduated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cgpa" className="text-white">CGPA/Percentage</Label>
                    <Input
                      id="cgpa"
                      name="cgpa"
                      value={formData.cgpa}
                      onChange={handleChange}
                      placeholder="8.5 or 85%"
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear" className="text-white">Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      name="graduationYear"
                      type="number"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      placeholder="2025"
                      min="2020"
                      max="2030"
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-zinc-900/50 backdrop-blur-xl border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-white">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New Delhi"
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-white">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Delhi"
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-white">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                      disabled
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Professional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-zinc-900/50 backdrop-blur-xl border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-white">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself, your interests, and career goals..."
                    rows={4}
                    className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20 resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-white">Skills</Label>
                  <Input
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, Python, Machine Learning, UI/UX Design (comma separated)"
                    className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github" className="text-white">GitHub Profile</Label>
                    <Input
                      id="github"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      placeholder="https://github.com/username"
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="text-white">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolio" className="text-white">Portfolio Website</Label>
                    <Input
                      id="portfolio"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="https://yourportfolio.com"
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center pb-8"
          >
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#e78a53] hover:bg-[#e78a53]/90 text-white font-medium py-3 px-8 rounded-xl transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isLoading 
                ? "Saving..." 
                : isFirstTime 
                  ? "Complete Profile" 
                  : "Save Changes"
              }
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  )
}

// Default page component for the /profile-setup route
export default function ProfileSetupPage() {
  return <ProfileSetup isFirstTime={true} />
}

// Export the component for use in modals
export { ProfileSetup }