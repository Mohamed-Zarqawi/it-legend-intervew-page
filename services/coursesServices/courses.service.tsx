import { supabase } from "@/lib/supabase";

// ------------------- Courses -------------------

// ------------------- get all courses -------------------

export const getAllCourses = async () => {
  const { data: courses, error } = await supabase
    .from("courses")
    .select("* , lessons:lessons(id)");

  if (error) throw error;

  return courses;
};

// ------------------- get one course -------------------

export const getOneCourse = async (courseId: string) => {
  const { data: course, error } = await supabase
    .from("courses")
    .select("*  , lessons:lessons(id)")
    .eq("id", courseId);

  console.log(course);
  if (error) throw error;

  return course;
};

// ------------------- get enrolled courses by userId -------------------

export const getEnrolledCourses = async (userId: string) => {
  const { data: enrolledCourses, error } = await supabase
    .from("enrolled_courses")
    .select("*  , course:courses(*,lessons(id))")
    .eq("userId", userId);

  if (error) throw error;

  return enrolledCourses;
};

// ------------------- enroll course by userId -------------------

export const enrollCourse = async (courseId: string, userId: string) => {
  const { data: enrolledCourse, error } = await supabase
    .from("enrolled_courses")
    .insert({ courseId: courseId, userId: userId });

  if (error) throw error;

  return enrolledCourse;
};
