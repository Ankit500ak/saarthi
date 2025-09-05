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
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(21,128,61,0.05)_1px,transparent_1px)] bg-[length:40px_40px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-4 md:px-6 md:py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {/* Brand Column - Simplified for mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="lg:col-span-2 md:col-span-3"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-lg font-black text-primary-foreground">S</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-foreground font-sans">Sarthi</h2>
                      <p className="text-xs text-muted-foreground font-medium hidden md:block">AI Internship Guide</p>
                    </div>
                  </div>

                  <p className="text-foreground/80 mb-4 text-sm leading-relaxed font-medium md:max-w-md">
                    AI-powered internship matching for students.
                  </p>

                  {/* Newsletter Signup - Compact for mobile */}
                  <div className="bg-card rounded-lg p-3 border border-border shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Send className="w-3 h-3 text-primary" />
                      <h3 className="text-sm font-bold text-card-foreground">Stay Updated</h3>
                    </div>
                    <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-input border-border h-8 text-sm"
                        required
                      />
                      <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 h-8">
                        <ArrowRight className="w-3 h-3" />
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
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="w-3 h-3 text-primary" />
                    <h3 className="text-sm font-bold text-foreground">Connect</h3>
                  </div>

                  {/* Contact Info - Simplified for mobile */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <Mail className="w-3 h-3 text-primary" />
                      <span className="hidden md:inline">hello@sarthi.ai</span>
                      <span className="md:hidden">Contact</span>
                    </div>
                  </div>

                  {/* Social Links - Compact */}
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-2">Follow</p>
                    <div className="flex gap-1">
                      {[
                        { icon: Twitter, href: "#", label: "Twitter" },
                        { icon: Linkedin, href: "#", label: "LinkedIn" },
                        { icon: Github, href: "#", label: "GitHub" },
                        { icon: Mail, href: "#", label: "Email" },
                      ].map(({ icon: Icon, href, label }) => (
                        <a
                          key={label}
                          href={href}
                          className="w-7 h-7 bg-card border border-border rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all duration-200"
                          aria-label={label}
                        >
                          <Icon className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Bar - Simplified for mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="border-t border-border mt-4 pt-3 flex flex-col md:flex-row justify-between items-center gap-2"
              >
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-center md:text-left">
                  <p className="text-muted-foreground text-xs font-medium">© 2024 Sarthi AI</p>
                  <div className="flex gap-3 text-xs">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Privacy
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Terms
                    </a>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs font-medium hidden md:block">
                  Empowering careers through AI
                </p>
              </motion.div>
            </div>

            {/* Decorative Element */}
            <motion.div
              className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"
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
