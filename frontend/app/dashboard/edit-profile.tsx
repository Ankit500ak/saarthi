"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "Arjun Patel",
    email: "arjun.patel@email.com",
    phone: "+91 98765 43210",
    location: "New Delhi, India",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    // Add API call or state update logic here
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="location">
                Location
              </label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your location"
              />
            </div>

            <Button type="submit" className="w-full mt-4">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}