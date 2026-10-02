import { supabase } from "@/lib/supabase";

// ------------------- Lessons -------------------

// ------------------- get course lessons -------------------

export const getAllCourseLessons = async (courseId: string) => {
  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", courseId)
    .order("position_order", { ascending: true });

  if (error) throw error;

  return lessons;
};

// ------------------- Get lesson  -------------------

export const getCourseLesson = async (lessonId: string) => {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", lessonId)
    .single();

  if (error) throw error;
  return data;
};

// ------------------- toggle Lesson Progress -------------------

export const toggleLessonProgress = async ({
  userId,
  lessonId,
  courseId,
  isCompleted,
}: {
  userId: string;
  lessonId: string;
  courseId: string;
  isCompleted: boolean;
}) => {
  const { data, error } = await supabase.rpc("toggle_lesson_progress", {
    p_user_id: userId,
    p_lesson_id: lessonId,
    p_course_id: courseId,
    p_is_completed: isCompleted,
  });

  if (error) throw error;
  return data[0];
};

// ------------------- get Course Progress -------------------

export const getCourseProgress = async (courseId: string, userId: string) => {
  const { data, error } = await supabase.rpc("get_course_progress_details", {
    p_course_id: courseId,
    p_user_id: userId,
  });

  if (error) throw error;
  return data[0];
};
