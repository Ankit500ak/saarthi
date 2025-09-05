"use client"
import { motion, AnimatePresence } from "framer-motion"
import type React from "react"

import { useState, useEffect } from "react"
import { Github, Twitter, Linkedin, Mail, BookOpen, Users, Send, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function StickyFooter() {
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const windowHeight = window.innerHeight
          const documentHeight = document.documentElement.scrollHeight
          const isNearBottom = scrollTop + windowHeight >= documentHeight - 100

          setIsAtBottom(isNearBottom)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <AnimatePresence>
      {isAtBottom && (
        <motion.div
          className="fixed z-50 bottom-0 left-0 w-full bg-background border-t border-border shadow-2xl"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(21,128,61,0.07)_1px,transparent_1px)] bg-[length:32px_32px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 md:px-12 md:py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10">
                {/* Brand Column - Simplified for mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="lg:col-span-2 md:col-span-3"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-black text-primary-foreground">S</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-foreground font-sans tracking-tight">Sarthi</h2>
                      <p className="text-sm text-muted-foreground font-medium hidden md:block">AI Internship Guide</p>
                    </div>
                  </div>

                  <p className="text-foreground/90 mb-6 text-base leading-relaxed font-semibold md:max-w-lg">
                    AI-powered internship matching for students.
                  </p>

                  {/* Newsletter Signup - Bolder and bigger */}
                  <div className="bg-card rounded-xl p-5 border-2 border-primary/30 shadow-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Send className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-bold text-card-foreground tracking-tight">Stay Updated</h3>
                    </div>
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-input border-2 border-primary/20 h-12 text-base px-4"
                        required
                      />
                      <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 h-12 text-base font-bold rounded-lg shadow-md">
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </form>
                  </div>
                </motion.div>

                {/* Resources Column - Hidden on mobile, shown on md+ */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="hidden md:block"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-3 h-3 text-primary" />
                    <h3 className="text-sm font-bold text-foreground">Resources</h3>
                  </div>
                  <ul className="space-y-1">
                    {["How It Works", "Success Stories", "Interview Tips", "Career Guide"].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-xs"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Company Column - Hidden on mobile, shown on md+ */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="hidden md:block"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-3 h-3 text-primary" />
                    <h3 className="text-sm font-bold text-foreground">Company</h3>
                  </div>
                  <ul className="space-y-1">
                    {["About Us", "Careers", "Contact Us"].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-xs"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Contact & Social Column - Simplified for mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="md:block"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Connect</h3>
                  </div>

                  {/* Contact Info - Bolder */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-3 text-muted-foreground text-base font-semibold">
                      <Mail className="w-5 h-5 text-primary" />
                      <span className="hidden md:inline">hello@sarthi.ai</span>
                      <span className="md:hidden">Contact</span>
                    </div>
                  </div>

                  {/* Social Links - Larger and more prominent */}
                  <div>
                    <p className="text-base font-bold text-foreground mb-3">Follow</p>
                    <div className="flex gap-2">
                      {[
                        { icon: Twitter, href: "#", label: "Twitter" },
                        { icon: Linkedin, href: "#", label: "LinkedIn" },
                        { icon: Github, href: "#", label: "GitHub" },
                        { icon: Mail, href: "#", label: "Email" },
                      ].map(({ icon: Icon, href, label }) => (
                        <a
                          key={label}
                          href={href}
                          className="w-10 h-10 bg-card border-2 border-primary/20 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/40 transition-all duration-200 shadow-md"
                          aria-label={label}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Bar - Bigger and bolder */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="border-t-2 border-primary/20 mt-8 pt-5 flex flex-col md:flex-row justify-between items-center gap-4"
              >
                <div className="flex flex-col md:flex-row gap-3 md:gap-8 text-center md:text-left">
                  <p className="text-muted-foreground text-base font-semibold">© 2024 Sarthi AI</p>
                  <div className="flex gap-5 text-base">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-semibold">
                      Privacy
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-semibold">
                      Terms
                    </a>
                  </div>
                </div>
                <p className="text-muted-foreground text-base font-semibold hidden md:block">
                  Empowering careers through <span className="text-primary font-bold">AI</span>
                </p>
              </motion.div>
            </div>

            {/* Decorative Element - bigger */}
            <motion.div
              className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
