"use client";

import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import CourseCard from "@/features/courses/components/CourseCard";
import { useGetAllCourses } from "@/features/courses/pages/hooks/useCourse";
import { ArrowRight, Code2, Timer, Trophy } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { data: currentUser } = useGetCurrentUser();
  const { data: courses, isLoading } = useGetAllCourses();

  const features = [
    {
      icon: <Code2 className="text-primary size-6" />,
      title: "Modern Tech Stack",
      description:
        "Learn Next.js, React, TypeScript, and Supabase. We teach the tools top companies actually use.",
    },
    {
      icon: <Timer className="text-primary size-6" />,
      title: "Interactive Weekly Exams",
      description:
        "Test your knowledge with timed quizzes. Auto-submitted, auto-graded, and saved securely.",
    },
    {
      icon: <Trophy className="text-primary size-6" />,
      title: "100% Free Forever",
      description:
        "No paywalls, no premium subscriptions. High-quality programming education accessible to everyone.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto flex max-w-4xl flex-col items-center space-y-8 px-4 text-center">
          <div className="bg-muted/50 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
            <span className="bg-primary mr-2 flex h-2 w-2 animate-pulse rounded-full"></span>
            100% Free Programming Courses
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Master Modern Web Development with{" "}
            <span className="text-primary">ZEKA COURSE</span>
          </h1>

          <p className="text-muted-foreground max-w-2xl text-lg md:text-xl">
            Bridge the gap between academic theory and real-world development.
            Build production-ready applications and track your progress with our
            interactive learning platform.
          </p>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <Link
              href="/courses"
              className="focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Start Learning Now
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              href="/about"
              className="focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-11 items-center justify-center rounded-md border px-8 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 border-y py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Why Choose ZEKA COURSE?
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              We provide everything you need to go from a beginner to a
              job-ready software engineer.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-card hover:border-primary/50 flex flex-col items-center space-y-4 rounded-xl border p-6 text-center shadow-sm transition-colors"
              >
                <div className="bg-primary/10 rounded-full p-3">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Preview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold md:text-4xl">
                Popular Courses
              </h2>
              <p className="text-muted-foreground text-lg">
                Start your journey with our most highly-rated paths.
              </p>
            </div>
            <Link
              href="/courses"
              className="text-primary flex items-center font-medium hover:underline"
            >
              View All Courses <ArrowRight className="ml-1 size-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses?.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground relative overflow-hidden py-20">
        <div className="relative z-10 container mx-auto max-w-4xl space-y-8 px-4 text-center">
          <h2 className="text-3xl font-bold md:text-5xl">
            Ready to write your first line of code?
          </h2>
          <p className="text-primary-foreground/80 mx-auto max-w-2xl text-lg md:text-xl">
            Join the ZEKA COURSE community today. It takes less than a minute to
            sign up, and it will always be free.
          </p>
          {currentUser ? (
            <Link
              href="/myLearning"
              className="bg-background text-primary hover:bg-background/90 inline-flex h-12 items-center justify-center rounded-md px-8 text-lg text-sm font-medium transition-colors"
            >
              View My Learning
            </Link>
          ) : (
            <Link
              href="/auth/signup"
              className="bg-background text-primary hover:bg-background/90 inline-flex h-12 items-center justify-center rounded-md px-8 text-lg text-sm font-medium transition-colors"
            >
              Create Your Free Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
