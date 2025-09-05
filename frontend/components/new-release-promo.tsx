"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Users, Target, Zap } from "lucide-react"

export function NewReleasePromo() {
  return (
    <section className="mt-12 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary p-8 lg:p-12">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
                Unlock Your Future with AI-Powered Internships
              </h2>

              <p className="text-xl text-white/90 mb-8 text-pretty">
                Personalized matching for your skills and goals. Let Sarthi's advanced AI connect you with the perfect
                PM internship opportunities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-4 group"
                >
                  Get Matched Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold text-lg px-8 py-4 bg-transparent"
                >
                  Learn How It Works
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm text-white/80">Match Success</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">2.5k+</div>
                  <div className="text-sm text-white/80">Students Placed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-white/80">Partner Companies</div>
                </div>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* AI Matching Visualization */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 animate-pulse-glow">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">AI Matching Engine</h3>
                  <p className="text-white/80 text-sm">Analyzing your profile...</p>
                </div>

                {/* Feature Icons */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                    className="flex items-center gap-3 bg-white/10 rounded-lg p-3"
                  >
                    <Target className="w-5 h-5 text-white" />
                    <span className="text-white text-sm font-medium">Skills Match</span>
                  </motion.div>

                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                    className="flex items-center gap-3 bg-white/10 rounded-lg p-3"
                  >
                    <Users className="w-5 h-5 text-white" />
                    <span className="text-white text-sm font-medium">Culture Fit</span>
                  </motion.div>

                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                    className="flex items-center gap-3 bg-white/10 rounded-lg p-3"
                  >
                    <Zap className="w-5 h-5 text-white" />
                    <span className="text-white text-sm font-medium">Quick Apply</span>
                  </motion.div>

                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                    className="flex items-center gap-3 bg-white/10 rounded-lg p-3"
                  >
                    <Brain className="w-5 h-5 text-white" />
                    <span className="text-white text-sm font-medium">AI Insights</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
