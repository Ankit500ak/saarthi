"use client";

import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, Users, BookOpen, Star, ArrowRight, Briefcase, TrendingUp, Award, Calendar, Bell, Heart, Eye, Bookmark, Zap, Globe, Target } from 'lucide-react';

const InternshipDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [savedInternships, setSavedInternships] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        {/* Loading Content */}
        <div className="relative z-10 text-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-spin mx-auto mb-8 opacity-80"></div>
            <div className="absolute inset-4 bg-slate-900 rounded-full flex items-center justify-center">
              <Briefcase className="w-12 h-12 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            InternVerse
          </h2>
          <div className="text-white/80 text-lg animate-pulse">Discovering extraordinary opportunities...</div>
          <div className="flex justify-center mt-6 space-x-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-150"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl transition-all duration-1000"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-gradient-to-r from-purple-500/8 to-pink-500/8 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-emerald-500/8 to-teal-500/8 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-10 w-64 h-64 rounded-full bg-gradient-to-r from-orange-500/8 to-yellow-500/8 blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Premium Header */}
        <header className="backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    I
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    InternVerse
                  </h1>
                  <p className="text-white/60 text-sm font-medium">Premium internship marketplace</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-4 px-4 py-2 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20">
                  <div className="text-sm text-white/80">
                    <span className="text-emerald-400 font-bold">Pro</span> Member
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <button className="relative p-3 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                  <Bell className="w-5 h-5 text-white/80 group-hover:text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">3</span>
                  </div>
                </button>
                
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl border-2 border-white/20 hover:scale-110 transition-transform duration-300 cursor-pointer"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Find Your Dream
              <br />
              <span className="text-white">Internship</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
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
                    <div className="backdrop-blur-2xl bg-white/10 rounded-3xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 relative">
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-xl`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="text-right">
                            <div className="text-emerald-400 font-bold text-sm bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                              {stat.trend}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                        <div className="text-white/80 font-semibold mb-1">{stat.label}</div>
                        <div className="text-white/50 text-sm">{stat.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Premium Search Section */}
          <div className="backdrop-blur-2xl bg-white/10 rounded-3xl p-8 mb-12 border border-white/20 shadow-2xl">
            <div className="flex flex-col space-y-6">
              {/* Search Bar */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                <div className="relative flex items-center">
                  <Search className="absolute left-6 text-white/60 w-6 h-6 group-hover:text-white transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Search for your perfect internship..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-lg backdrop-blur-sm"
                  />
                  <button className="absolute right-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
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
                          ? 'border-white/40 bg-white/20 shadow-xl'
                          : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg relative z-10`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="relative z-10">
                        <div className="text-white font-bold">{category.name}</div>
                        <div className="text-white/60 text-sm">{category.count} jobs</div>
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
              <h3 className="text-3xl font-bold text-white mb-2">
                {filteredInternships.length} Premium Opportunities
              </h3>
              <p className="text-white/60 text-lg">Hand-picked positions from top-tier companies</p>
            </div>
            <div className="flex items-center space-x-4">
              <select className="backdrop-blur-md bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 cursor-pointer">
                <option value="recent" className="bg-slate-800">Most Recent</option>
                <option value="salary" className="bg-slate-800">Highest Paid</option>
                <option value="rating" className="bg-slate-800">Best Rated</option>
                <option value="applicants" className="bg-slate-800">Trending</option>
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
                <div className="backdrop-blur-2xl bg-white/10 rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 relative overflow-hidden shadow-2xl">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center text-2xl border border-white/20 backdrop-blur-sm">
                          {internship.logo}
                        </div>
                        {internship.verified && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-white fill-current" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                            {internship.title}
                          </h4>
                          {internship.urgent && (
                            <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full animate-pulse">
                              HOT
                            </div>
                          )}
                        </div>
                        <p className="text-white/80 font-semibold text-lg mb-2">{internship.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-white/60">
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
                      className="p-3 backdrop-blur-md bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                      <Heart 
                        className={`w-5 h-5 transition-all duration-300 ${
                          savedInternships.has(internship.id) 
                            ? 'text-red-400 fill-current transform scale-110' 
                            : 'text-white/60 hover:text-red-400'
                        }`} 
                      />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-sm mb-6 leading-relaxed relative z-10">
                    {internship.description}
                  </p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
                    <div className="backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-white/50 text-xs font-medium mb-1">DURATION</div>
                      <div className="text-white font-bold">{internship.duration}</div>
                    </div>
                    <div className="backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-white/50 text-xs font-medium mb-1">TYPE</div>
                      <div className="text-white font-bold">{internship.type}</div>
                    </div>
                    <div className="backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-white/50 text-xs font-medium mb-1">SALARY</div>
                      <div className="text-emerald-400 font-bold">{internship.salary}</div>
                    </div>
                  </div>

                  {/* Stats Bar */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-bold">{internship.rating}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/60 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{internship.applicants.toLocaleString()} applicants</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-white/60" />
                      <span className="text-white/60 text-sm">High demand</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {internship.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 rounded-xl text-sm font-medium border border-cyan-500/30 backdrop-blur-sm hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 relative z-10">
                    <button className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-4 rounded-2xl hover:from-cyan-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl group">
                      <span>Apply Now</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                    <button className="px-6 backdrop-blur-md bg-white/10 text-white font-bold py-4 rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Section */}
          <div className="text-center mt-16">
            <button className="group px-12 py-6 backdrop-blur-2xl bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-purple-300">
                Load More Opportunities
              </span>
            </button>
          </div>
        </main>

        {/* Premium Footer */}
        <footer className="backdrop-blur-2xl bg-white/5 border-t border-white/10 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand Section */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative group">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl">
                      I
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30"></div>
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    InternVerse
                  </h3>
                </div>
                <p className="text-white/70 leading-relaxed mb-6 max-w-md">
                  Connecting ambitious students with world-class companies. 
                  Your journey to an extraordinary career starts here.
                </p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 backdrop-blur-md bg-white/10 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-blue-600 rounded group-hover:scale-110 transition-transform duration-300"></div>
                  </div>
                  <div className="w-10 h-10 backdrop-blur-md bg-white/10 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                    <div className="w-5 h-5 bg-gradient-to-r from-pink-400 to-red-500 rounded group-hover:scale-110 transition-transform duration-300"></div>
                  </div>
                  <div className="w-10 h-10 backdrop-blur-md bg-white/10 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded group-hover:scale-110 transition-transform duration-300"></div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-bold mb-4">Quick Links</h4>
                <ul className="space-y-3">
                  {['Browse Jobs', 'Featured Companies', 'Success Stories', 'Career Guide', 'Resources'].map((link, index) => (
                    <li key={index}>
                      <a href="#" className="text-white/60 hover:text-white transition-colors duration-300 flex items-center space-x-2 group">
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        <span>{link}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-white font-bold mb-4">Support</h4>
                <ul className="space-y-3">
                  {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'FAQ'].map((link, index) => (
                    <li key={index}>
                      <a href="#" className="text-white/60 hover:text-white transition-colors duration-300 flex items-center space-x-2 group">
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        <span>{link}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="backdrop-blur-2xl bg-white/10 rounded-2xl p-6 border border-white/20 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Stay Updated</h4>
                  <p className="text-white/70">Get the latest internship opportunities delivered to your inbox.</p>
                </div>
                <div className="flex space-x-3 md:min-w-96">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 backdrop-blur-sm"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pt-8 border-t border-white/10 space-y-4 md:space-y-0">
              <div className="text-white/60 text-sm">
                © 2024 InternVerse. All rights reserved. Made with ❤️ for ambitious students.
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <span className="text-white/60">🌍 Available in 50+ countries</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium">All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="group relative">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-110">
              <Search className="w-7 h-7 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Toast Notification (Example) */}
        <div className="fixed top-24 right-8 z-50 transform translate-x-full opacity-0 transition-all duration-500 hover:translate-x-0 hover:opacity-100">
          <div className="backdrop-blur-2xl bg-emerald-500/90 text-white px-6 py-4 rounded-2xl border border-emerald-400/30 shadow-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm">New Match Found!</div>
                <div className="text-emerald-100 text-xs">3 new internships match your profile</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default InternshipDashboard;
