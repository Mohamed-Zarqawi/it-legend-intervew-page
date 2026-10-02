# 🚀 IT Legend - Interactive Learning Platform

> A modern, full-stack interactive learning management platform built to deliver structured courses, video lessons, and real-time weekly quizzes with automated grading, state persistence, and secure user authentication.

---

## 🛠️ Tech Stack

This project leverages a high-performance modern web development stack:

* **Framework:** [Next.js](https://nextjs.org/) (App Router & React Server Components)
* **Library:** [React](https://react.dev/)
* **Type Safety:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
* **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, and Real-time)
* **Authentication:** Supabase Auth (Secure JWT-based session management)
* **State Management & Data Fetching:** [TanStack Query](https://tanstack.com/query) (React Query)
* **Form Management:** Formik & Yup (Validation schemas)

---

## ✨ Key Features

* **🔐 Full Authentication System:** Secure user registration, login, and session persistence powered by Supabase Auth, featuring protected routes and automatic user redirection.
* **📚 Dynamic Course & Lesson Management:** Interactive course outlines, multi-week structures, and structured video lesson delivery.
* **⏱️ Interactive Weekly Exams & Timers:**
  * Dedicated quiz interface for each week featuring multiple-choice questions fetched dynamically from the database.
  * Custom countdown timer hook (`useLessonTimer`) with live minute/second formatting and visual warning indicators.
  * **Auto-Submission:** Automatically submits the exam when the time expires.
* **💾 Local Storage Draft Persistence:** Quiz answers are saved locally in real-time (`localStorage`), preventing data loss if the page reloads or the browser crashes.
* **📊 Automated Grading & Result Tracking:** Instant calculation of exam scores upon submission, storing passing/failing states, and fetching previous user scores (`useUserExamResult`) to prevent redundant attempts or display historical grades.
* **🎨 Responsive & Accessible UI:** Fully responsive layouts optimized for mobile and desktop screens, built with Tailwind CSS and custom shadcn-styled components.

---

## 📁 Project Structure

```text
it-legend/
├── app/                  # Next.js App Router pages and layouts
├── components/           # Reusable UI components (shadcn/ui primitives)
├── features/             # Feature-based modules (Auth, Exams, Courses)
│   ├── auth/             # Authentication hooks and components
│   └── exams/            # Exam logic, components, and hooks (ExamDialog, Timer)
├── public/               # Static assets (images, icons)
├── styles/               # Global CSS styles
└── types/                # TypeScript interface definitions