"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, MapPin, Clock, DollarSign, Users, BookOpen, Star, ArrowRight, Briefcase, TrendingUp, Award, Calendar, Bell, Heart, Eye, Bookmark, Zap, Globe, Target } from 'lucide-react';

const InternshipDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [savedInternships, setSavedInternships] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [user, setUser] = useState<{ id: number; username: string; email: string } | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check the current session user
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/users/me/', {
          method: 'GET',
          credentials: 'include',
        });
        if (res.status === 401) {
          router.replace('/login');
          return;
        }
        const data = await res.json();
        if (data?.authenticated) {
          setUser({ id: data.id, username: data.username, email: data.email });
        } else {
          router.replace('/login');
          return;
        }
      } catch (e) {
        router.replace('/login');
        return;
      } finally {
        setAuthChecked(true);
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const categories = [
    { id: 'all', name: 'All', icon: Globe, gradient: 'from-cyan-400 via-blue-500 to-indigo-600', count: '2.8k' },
    { id: 'tech', name: 'Tech', icon: Zap, gradient: 'from-emerald-400 via-teal-500 to-cyan-600', count: '1.2k' },
    { id: 'design', name: 'Design', icon: Award, gradient: 'from-pink-400 via-rose-500 to-red-600', count: '847' },
    { id: 'marketing', name: 'Marketing', icon: Target, gradient: 'from-orange-400 via-yellow-500 to-amber-600', count: '623' },
    { id: 'finance', name: 'Finance', icon: TrendingUp, gradient: 'from-purple-400 via-violet-500 to-indigo-600', count: '456' }
  ];

  const internships = [
    {
      id: 1,
      title: 'Senior Frontend Developer Intern',
      company: 'Meta',
      location: 'Menlo Park, CA',
      type: 'Hybrid',
      duration: '6 months',
      salary: '$3500',
      category: 'tech',
      rating: 4.9,
      applicants: 1247,
      posted: '2h ago',
      skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
      logo: '🦄',
      urgent: true,
      verified: true,
      remote: true,
      description: 'Build the future of social connection through immersive frontend experiences.',
      companyRating: 4.8,
      benefits: ['Health Insurance', 'Learning Budget', 'Flexible Hours']
    },
    {
      id: 2,
      title: 'Product Design Intern',
      company: 'Apple',
      location: 'Cupertino, CA',
      type: 'On-site',
      duration: '4 months',
      salary: '$4200',
      category: 'design',
      rating: 5.0,
      applicants: 2156,
      posted: '1d ago',
      skills: ['Figma', 'Sketch', 'Prototyping', 'User Research'],
      logo: '🍎',
      urgent: false,
      verified: true,
      remote: false,
      description: 'Design intuitive experiences that millions of users will love and use daily.',
      companyRating: 4.9,
      benefits: ['Premium Healthcare', 'Stock Options', 'Gym Membership']
    },
    {
      id: 3,
      title: 'AI/ML Research Intern',
      company: 'OpenAI',
      location: 'San Francisco, CA',
      type: 'Remote',
      duration: '8 months',
      salary: '$5000',
      category: 'tech',
      rating: 4.8,
      applicants: 3421,
      posted: '3d ago',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Research'],
      logo: '🤖',
      urgent: true,
      verified: true,
      remote: true,
      description: 'Push the boundaries of artificial intelligence and machine learning research.',
      companyRating: 4.7,
      benefits: ['Research Budget', 'Conference Travel', 'Mentorship']
    },
    {
      id: 4,
      title: 'Digital Marketing Strategist',
      company: 'Netflix',
      location: 'Los Angeles, CA',
      type: 'Hybrid',
      duration: '5 months',
      salary: '$2800',
      category: 'marketing',
      rating: 4.7,
      applicants: 892,
      posted: '5d ago',
      skills: ['SEO', 'Content Strategy', 'Analytics', 'Social Media'],
      logo: '🎬',
      urgent: false,
      verified: true,
      remote: false,
      description: 'Drive global marketing campaigns for the world\'s leading streaming platform.',
      companyRating: 4.6,
      benefits: ['Unlimited PTO', 'Content Access', 'Creative Freedom']
    }
  ];

  const stats = [
    { 
      label: 'Active Positions', 
      value: '2,847', 
      trend: '+23%', 
      icon: Briefcase, 
      gradient: 'from-cyan-400 to-blue-600',
      description: 'Available now'
    },
    { 
      label: 'Your Applications', 
      value: '12', 
      trend: '+4', 
      icon: Users, 
      gradient: 'from-emerald-400 to-teal-600',
      description: 'In progress'
    },
    { 
      label: 'Interview Invites', 
      value: '5', 
      trend: '+2', 
      icon: Calendar, 
      gradient: 'from-purple-400 to-indigo-600',
      description: 'This week'
    },
    { 
      label: 'Success Rate', 
      value: '84%', 
      trend: '+12%', 
      icon: TrendingUp, 
      gradient: 'from-pink-400 to-rose-600',
      description: 'Above average'
    }
  ];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || internship.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSaved = (id: number) => {
    const newSaved = new Set(savedInternships);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    setSavedInternships(newSaved);
  };

  if (isLoading || !authChecked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-100 to-white flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-200/30 to-blue-200/30 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-200/30 to-pink-200/30 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-emerald-200/30 to-teal-200/30 blur-3xl animate-pulse delay-2000"></div>
        </div>
        {/* Loading Content */}
        <div className="relative z-10 text-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 animate-spin mx-auto mb-8 opacity-80"></div>
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              <Briefcase className="w-12 h-12 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            InternVerse
          </h2>
          <div className="text-gray-500 text-lg animate-pulse">Discovering extraordinary opportunities...</div>
          <div className="flex justify-center mt-6 space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white text-gray-900 relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-200/20 to-blue-200/20 blur-3xl transition-all duration-1000"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-gradient-to-r from-purple-200/10 to-pink-200/10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-emerald-200/10 to-teal-200/10 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-10 w-64 h-64 rounded-full bg-gradient-to-r from-orange-200/10 to-yellow-200/10 blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Premium Header */}
        <header className="backdrop-blur-xl bg-white/80 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    I
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    InternVerse
                  </h1>
                  <p className="text-gray-500 text-sm font-medium">Welcome{user ? `, ${user.username}` : ''}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-4 px-4 py-2 backdrop-blur-md bg-white/60 rounded-2xl border border-gray-200">
                  <div className="text-sm text-gray-700">
                    <span className="text-emerald-500 font-bold">Pro</span> Member
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <button className="relative p-3 backdrop-blur-md bg-white/60 rounded-2xl border border-gray-200 hover:bg-white/80 transition-all duration-300 group">
                  <Bell className="w-5 h-5 text-gray-500 group-hover:text-emerald-500" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">3</span>
                  </div>
                </button>
                
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-2xl border-2 border-gray-200 hover:scale-110 transition-transform duration-300 cursor-pointer flex items-center justify-center font-bold text-white">
                  {user?.username?.[0]?.toUpperCase() ?? 'U'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
              Find Your Dream
              <br />
              <span className="text-gray-900">Internship</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Discover extraordinary opportunities at world-class companies. Your future starts here.
            </p>
          </div>

          {/* Premium Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="group cursor-pointer transform hover:scale-105 transition-all duration-500 hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <div className="backdrop-blur-2xl bg-white rounded-3xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 relative shadow-md">
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-xl`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="text-right">
                            <div className="text-emerald-500 font-bold text-sm bg-emerald-100/40 px-3 py-1 rounded-full border border-emerald-200">
                              {stat.trend}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-4xl font-black text-gray-900 mb-2">{stat.value}</div>
                        <div className="text-gray-700 font-semibold mb-1">{stat.label}</div>
                        <div className="text-gray-400 text-sm">{stat.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Premium Search Section */}
          <div className="backdrop-blur-2xl bg-white rounded-3xl p-8 mb-12 border border-gray-200 shadow-2xl">
            <div className="flex flex-col space-y-6">
              {/* Search Bar */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-purple-100 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                <div className="relative flex items-center">
                  <Search className="absolute left-6 text-gray-400 w-6 h-6 group-hover:text-cyan-500 transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Search for your perfect internship..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all duration-300 text-lg backdrop-blur-sm"
                  />
                  <button className="absolute right-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-400 text-white font-bold rounded-xl hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105">
                    Search
                  </button>
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`group flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 border relative overflow-hidden ${
                        selectedCategory === category.id
                          ? 'border-cyan-400 bg-cyan-50 shadow-xl'
                          : 'border-gray-200 bg-white hover:bg-cyan-50 hover:border-cyan-200'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg relative z-10`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="relative z-10">
                        <div className="text-gray-900 font-bold">{category.name}</div>
                        <div className="text-gray-400 text-sm">{category.count} jobs</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {filteredInternships.length} Premium Opportunities
              </h3>
              <p className="text-gray-500 text-lg">Hand-picked positions from top-tier companies</p>
            </div>
            <div className="flex items-center space-x-4">
              <select className="backdrop-blur-md bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-cyan-400 cursor-pointer">
                <option value="recent" className="bg-white">Most Recent</option>
                <option value="salary" className="bg-white">Highest Paid</option>
                <option value="rating" className="bg-white">Best Rated</option>
                <option value="applicants" className="bg-white">Trending</option>
              </select>
            </div>
          </div>

          {/* Premium Internship Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredInternships.map((internship, index) => (
              <div
                key={internship.id}
                className="group cursor-pointer transform hover:scale-[1.02] transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="backdrop-blur-2xl bg-white rounded-3xl p-8 border border-gray-200 hover:border-cyan-300 transition-all duration-300 relative overflow-hidden shadow-xl">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/20 via-purple-100/20 to-pink-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-white flex items-center justify-center text-2xl border border-gray-200 backdrop-blur-sm">
                          {internship.logo}
                        </div>
                        {internship.verified && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-white fill-current" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-xl font-bold text-gray-900 group-hover:text-cyan-500 transition-colors duration-300">
                            {internship.title}
                          </h4>
                          {internship.urgent && (
                            <div className="px-3 py-1 bg-gradient-to-r from-red-400 to-pink-400 text-white text-xs font-bold rounded-full animate-pulse">
                              HOT
                            </div>
                          )}
                        </div>
                        <p className="text-gray-700 font-semibold text-lg mb-2">{internship.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{internship.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{internship.posted}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaved(internship.id);
                      }}
                      className="p-3 backdrop-blur-md bg-white rounded-xl border border-gray-200 hover:bg-cyan-50 transition-all duration-300"
                    >
                      <Heart 
                        className={`w-5 h-5 transition-all duration-300 ${
                          savedInternships.has(internship.id) 
                            ? 'text-red-400 fill-current transform scale-110' 
                            : 'text-gray-400 hover:text-red-400'
                        }`} 
                      />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed relative z-10">
                    {internship.description}
                  </p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
                    <div className="backdrop-blur-md bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="text-gray-400 text-xs font-medium mb-1">DURATION</div>
                      <div className="text-gray-900 font-bold">{internship.duration}</div>
                    </div>
                    <div className="backdrop-blur-md bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="text-gray-400 text-xs font-medium mb-1">TYPE</div>
                      <div className="text-gray-900 font-bold">{internship.type}</div>
                    </div>
                    <div className="backdrop-blur-md bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="text-gray-400 text-xs font-medium mb-1">SALARY</div>
                      <div className="text-emerald-500 font-bold">{internship.salary}</div>
                    </div>
                  </div>

                  {/* Stats Bar */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 bg-cyan-50 rounded-lg px-3 py-2 backdrop-blur-sm">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-900 font-bold">{internship.rating}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{internship.applicants.toLocaleString()} applicants</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400 text-sm">High demand</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {internship.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-100/60 to-purple-100/60 text-cyan-700 rounded-xl text-sm font-medium border border-cyan-200 backdrop-blur-sm hover:from-cyan-200/80 hover:to-purple-200/80 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 relative z-10">
                    <button className="flex-1 bg-gradient-to-r from-cyan-400 to-purple-400 text-white font-bold py-4 rounded-2xl hover:from-cyan-500 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl group">
                      <span>Apply Now</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                    <button className="px-6 backdrop-blur-md bg-white text-gray-900 font-bold py-4 rounded-2xl border border-gray-200 hover:bg-cyan-50 transition-all duration-300 flex items-center justify-center">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Section */}
          <div className="text-center mt-16">
            <button className="group px-12 py-6 backdrop-blur-2xl bg-white hover:bg-cyan-50 text-cyan-600 font-bold rounded-2xl border border-gray-200 hover:border-cyan-300 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent group-hover:from-cyan-500 group-hover:to-purple-500">
                Load More Opportunities
              </span>
            </button>
          </div>
        </main>

        {/* Premium Footer */}
        <footer className="backdrop-blur-2xl bg-white/80 border-t border-gray-200 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand Section */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative group">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl">
                      I
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl blur opacity-30"></div>
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    InternVerse
                  </h3>
                </div>
                <p className="text-gray-500 leading-relaxed mb-6 max-w-md">
                  Connecting ambitious students with world-class companies. 
                  Your journey to an extraordinary career starts here.
                </p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 backdrop-blur-md bg-white rounded-xl border border-gray-200 flex items-center justify-center hover:bg-cyan-50 transition-all duration-300 cursor-pointer group">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-blue-600 rounded group-hover:scale-110 transition-transform duration-300"></div>
                  </div>
                  <div className="w-10 h-10 backdrop-blur-md bg-white rounded-xl border border-gray-200 flex items-center justify-center hover:bg-pink-50 transition-all duration-300 cursor-pointer group">
                    <div className="w-5 h-5 bg-gradient-to-r from-pink-400 to-red-400 rounded group-hover:scale-110 transition-transform duration-300"></div>
                  </div>
                  <div className="w-10 h-10 backdrop-blur-md bg-white rounded-xl border border-gray-200 flex items-center justify-center hover:bg-indigo-50 transition-all duration-300 cursor-pointer group">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded group-hover:scale-110 transition-transform duration-300"></div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-gray-900 font-bold mb-4">Quick Links</h4>
                <ul className="space-y-3">
                  {['Browse Jobs', 'Featured Companies', 'Success Stories', 'Career Guide', 'Resources'].map((link, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-500 hover:text-cyan-500 transition-colors duration-300 flex items-center space-x-2 group">
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        <span>{link}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-gray-900 font-bold mb-4">Support</h4>
                <ul className="space-y-3">
                  {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'FAQ'].map((link, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-500 hover:text-cyan-500 transition-colors duration-300 flex items-center space-x-2 group">
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        <span>{link}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="backdrop-blur-2xl bg-white rounded-2xl p-6 border border-gray-200 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Stay Updated</h4>
                  <p className="text-gray-500">Get the latest internship opportunities delivered to your inbox.</p>
                </div>
                <div className="flex space-x-3 md:min-w-96">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-400 backdrop-blur-sm"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-400 text-white font-bold rounded-xl hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pt-8 border-t border-gray-200 space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2024 InternVerse. All rights reserved. Made with ❤️ for ambitious students.
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <span className="text-gray-400">🌍 Available in 50+ countries</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-500 font-medium">All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="group relative">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center shadow-2xl hover:shadow-cyan-400/25 transition-all duration-300 transform hover:scale-110">
              <Search className="w-7 h-7 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Toast Notification (Example) */}
        <div className="fixed top-24 right-8 z-50 transform translate-x-full opacity-0 transition-all duration-500 hover:translate-x-0 hover:opacity-100">
          <div className="backdrop-blur-2xl bg-emerald-400/90 text-white px-6 py-4 rounded-2xl border border-emerald-200 shadow-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm">New Match Found!</div>
                <div className="text-emerald-50 text-xs">3 new internships match your profile</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDashboard;
