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
    .select("*")
    .eq("id", courseId);

  if (error) throw error;

  return course;
};
