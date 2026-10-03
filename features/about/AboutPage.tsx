import {
  Code,
  Heart,
  MonitorPlay,
  Rocket,
  ShieldCheck,
  Timer,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | ZEKA COURSE",
  description:
    "Learn more about ZEKA COURSE, your premier platform for learning modern programming technologies for free.",
};

export default function AboutPage() {
  const features = [
    {
      icon: <Rocket className="text-primary size-6" />,
      title: "Cutting-Edge Technologies",
      description:
        "We focus on teaching the most in-demand tools and frameworks in today's job market (Next.js, React, Supabase).",
    },
    {
      icon: <Heart className="text-primary size-6" />,
      title: "100% Free",
      description:
        "No hidden fees or subscriptions. All learning paths, lessons, and exams are completely free for everyone.",
    },
    {
      icon: <Timer className="text-primary size-6" />,
      title: "Interactive Exams",
      description:
        "Evaluate your progress weekly through an interactive exam system with a countdown timer and automated grading.",
    },
    {
      icon: <Code className="text-primary size-6" />,
      title: "Project-Based Learning",
      description:
        "We skip the dry theory and dive straight into building real-world applications that prepare you for the job market.",
    },
    {
      icon: <MonitorPlay className="text-primary size-6" />,
      title: "Seamless Experience",
      description:
        "A lightweight, fast, and fully responsive platform so you can learn from any device, anytime.",
    },
    {
      icon: <ShieldCheck className="text-primary size-6" />,
      title: "Secure Environment",
      description:
        "Protected accounts and an auto-save system for your exam progress, so you never lose your hard work.",
    },
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      {/* Header Section */}
      <div className="mb-16 space-y-4 text-center">
        <div className="text-4xl font-bold tracking-tight md:text-5xl">
          About <span className="text-primary">ZEKA COURSE</span>
        </div>
        <div className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
          Empowering the next generation of developers with 100% free,
          cutting-edge tech courses.
        </div>
      </div>

      {/* Story Section */}
      <section className="bg-card mb-16 rounded-2xl border p-8 shadow-sm md:p-12">
        <div className="mb-4 text-2xl font-bold">Our Story & Vision</div>
        <div className="text-muted-foreground text-lg leading-relaxed">
          <span className="text-foreground">ZEKA COURSE</span> was founded with
          a clear and specific vision:{" "}
          <span className="text-foreground font-medium">
            Making high-quality programming education accessible to everyone
            without any financial barriers.
          </span>
          <br />
          <br />
          In a world where programming and web development are evolving at
          lightning speed, we believe it's crucial for developers to stay
          up-to-date with the latest tools and best practices. That's why we
          built a comprehensive learning platform that offers completely free,
          professional courses focused on practical application and building
          real projects rather than just theoretical filler.
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-16">
        <div className="mb-8 text-center text-2xl font-bold">
          Why Learn With Us?
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card hover:border-primary/50 space-y-4 rounded-2xl border p-6 transition-all hover:shadow-md"
            >
              <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                {feature.icon}
              </div>
              <div className="text-xl font-semibold">{feature.title}</div>
              <div className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-primary/5 border-primary/20 rounded-2xl border p-8 text-center md:p-12">
        <Rocket className="text-primary mx-auto mb-4 size-10" />
        <div className="mb-4 text-2xl font-bold">Our Mission</div>
        <blockquote className="text-foreground mx-auto max-w-3xl text-xl font-medium italic md:text-2xl">
          "Bridging the gap between academic learning and modern job market
          demands by providing up-to-date programming content that is accessible
          to everyone."
        </blockquote>
      </section>
    </div>
  );
}
