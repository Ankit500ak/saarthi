import { Marquee } from "@/components/magicui/marquee"

const testimonials = [
  {
    name: "Aditi Sharma",
    username: "@aditi_dev",
    body: "Sarthi matched me with a Data Science internship that I never would have found myself. The AI nailed it!",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Raj Patel",
    username: "@raj_codes",
    body: "I got my internship in just 3 weeks thanks to Sarthi's smart recommendations. Game changer for students!",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Priya Singh",
    username: "@priya_builds",
    body: "Finally, a platform that actually understands students. Easy, fast, and effective for finding internships.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Arjun Mehta",
    username: "@arjun_intern",
    body: "The PM Internship Scheme integration makes everything so smooth. Found my dream startup internship!",
    img: "https://images.unsplash.com/photo-1500648767791-15a19d654956?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Kavya Reddy",
    username: "@kavya_tech",
    body: "Sarthi's AI recommendations are spot-on. Got matched with companies I didn't even know existed.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Rohit Kumar",
    username: "@rohit_dev",
    body: "As a final year student, Sarthi helped me land an internship that led to a full-time offer. Incredible!",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Sneha Gupta",
    username: "@sneha_codes",
    body: "The real-time dashboard keeps me updated on all my applications. No more missing deadlines!",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Vikram Joshi",
    username: "@vikram_intern",
    body: "Government verified internships give me confidence. Sarthi ensures I'm applying to legitimate opportunities.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Ananya Das",
    username: "@ananya_ai",
    body: "From skills assessment to perfect matches - Sarthi's AI is like having a personal career counselor.",
    img: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

const TestimonialCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <div
      className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-white/10 p-10 shadow-lg"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-primary/20 to-transparent blur-md"></div>

      <div className="leading-relaxed" style={{ color: "#ffffff" }}>
        {body}
      </div>

      <div className="mt-5 flex items-center gap-2">
        <img src={img || "/placeholder.svg"} alt={name} height="40" width="40" className="h-10 w-10 rounded-full" />
        <div className="flex flex-col">
          <div className="leading-5 font-medium tracking-tight" style={{ color: "#ffffff" }}>
            {name}
          </div>
          <div className="leading-5 tracking-tight" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
            {username}
          </div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="mb-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-[540px]">
          <div className="flex justify-center">
            <button
              type="button"
              className="group relative z-[60] mx-auto rounded-full border border-primary/30 bg-primary/10 px-6 py-1 text-xs backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100 md:text-sm"
            >
              <div className="absolute inset-x-0 -top-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
              <div className="absolute inset-x-0 -bottom-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent shadow-2xl transition-all duration-500 group-hover:h-px"></div>
              <span className="relative text-primary font-medium">Student Success Stories</span>
            </button>
          </div>
          <h2 className="from-foreground/60 via-foreground to-foreground/60 dark:from-muted-foreground/55 dark:via-foreground dark:to-muted-foreground/55 mt-5 bg-gradient-to-r bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent md:text-[54px] md:leading-[60px] __className_bb4e88 relative z-10">
            Hear From Students
          </h2>

          <p className="mt-5 relative z-10 text-center text-lg text-zinc-400">
            Discover how Sarthi has helped thousands of students find their perfect internships across India.
          </p>
        </div>

        <div className="my-16 flex max-h-[738px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <div>
            <Marquee pauseOnHover vertical className="[--duration:20s]">
              {firstColumn.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
          </div>

          <div className="hidden md:block">
            <Marquee reverse pauseOnHover vertical className="[--duration:25s]">
              {secondColumn.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
          </div>

          <div className="hidden lg:block">
            <Marquee pauseOnHover vertical className="[--duration:30s]">
              {thirdColumn.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
          </div>
        </div>

        <div className="-mt-8 flex justify-center">
          <button className="group relative inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary px-6 py-3 text-sm font-medium text-white transition-all hover:border-primary/60 hover:bg-primary/90 active:scale-95">
            <div className="absolute inset-x-0 -top-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            <div className="absolute inset-x-0 -bottom-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
            </svg>
            Share your Sarthi story
          </button>
        </div>
      </div>
    </section>
  )
}
