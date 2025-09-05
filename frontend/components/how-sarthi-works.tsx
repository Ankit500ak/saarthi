"use client"

import { motion } from "framer-motion"
import { Brain, Target, Trophy, Users, Zap, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HowSarthiWorks() {
  const steps = [
    {
      id: 1,
      icon: Brain,
      title: "AI-Powered Skill Analysis",
      description:
        "Our advanced AI analyzes your skills, preferences, and career goals to create a personalized profile.",
      features: ["Skill assessment", "Career mapping", "Preference analysis"],
      color: "text-primary",
      bgColor: "bg-card",
    },
    {
      id: 2,
      icon: Target,
      title: "Smart Internship Matching",
      description: "Get personalized internship recommendations that perfectly match your skills and aspirations.",
      features: ["Precision matching", "Real-time updates", "Quality filtering"],
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      id: 3,
      icon: Star,
      title: "Success Score Tracking",
      description: "Earn points for applications, interviews, and achievements. Track your progress in real-time.",
      features: ["Performance metrics", "Achievement badges", "Progress tracking"],
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
    {
      id: 4,
      icon: Trophy,
      title: "Competitive Leaderboards",
      description: "Compete with peers, showcase your achievements, and get recognized by top recruiters.",
      features: ["Peer competition", "Public recognition", "Recruiter visibility"],
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
    },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-sans">How Sarthi Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the future of internship discovery with our AI-powered platform that matches you with perfect
            opportunities and tracks your success journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative"
            >
              <Card
                className={`${step.bgColor} border-border/50 hover:border-primary/30 transition-all duration-300 h-full`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center ${step.color}`}
                    >
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold text-primary/30">{step.id.toString().padStart(2, "0")}</div>
                  </div>

                  <h3 className="text-xl font-bold text-card-foreground mb-3 font-sans">{step.title}</h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">{step.description}</p>

                  <ul className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <Zap className="w-3 h-3 mr-2 text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border z-10">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-2xl p-8 md:p-12 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h4 className="text-2xl font-bold text-card-foreground mb-2">10,000+</h4>
              <p className="text-muted-foreground">Active Students</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-score-counter">
                <Target className="w-10 h-10 text-accent" />
              </div>
              <h4 className="text-2xl font-bold text-card-foreground mb-2">95%</h4>
              <p className="text-muted-foreground">Match Accuracy</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-chart-5/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-leaderboard-pulse">
                <Trophy className="w-10 h-10 text-chart-5" />
              </div>
              <h4 className="text-2xl font-bold text-card-foreground mb-2">5,000+</h4>
              <p className="text-muted-foreground">Successful Placements</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 font-sans">Ready to Start Your Journey?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found their perfect internships through Sarthi's AI-powered platform.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
          >
            Get Started with Sarthi
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
