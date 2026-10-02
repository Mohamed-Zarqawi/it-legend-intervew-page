import { supabase } from "@/lib/supabase";

export interface ExamQuestion {
  id: string;
  exam_id: string;
  question: string;
  options: string[];
  correct_answer: number;
}

export interface Exam {
  id: string;
  course_id: string;
  title: string;
  week: string;
  passing_score: number;
  exam_questions?: ExamQuestion[];
}

export const getExamByWeek = async (
  courseId: string,
  week: string,
): Promise<Exam | null> => {
  const { data: exam, error: examError } = await supabase
    .from("exams")
    .select("*")
    .eq("course_id", courseId)
    .eq("week", week)
    .single();

  if (examError || !exam) {
    return null;
  }

  const { data: questions, error: qError } = await supabase
    .from("exam_questions")
    .select("*")
    .eq("exam_id", exam.id);

  if (qError) {
    console.error("Error fetching exam questions:", qError);
  }

  return {
    ...exam,
    exam_questions: questions || [],
  };
};

export const submitExamResult = async ({
  userId,
  examId,
  score,
  isPassed,
}: {
  userId: string;
  examId: string;
  score: number;
  isPassed: boolean;
}) => {
  const { data, error } = await supabase
    .from("user_exam_results")
    .insert([
      {
        user_id: userId,
        exam_id: examId,
        score,
        is_passed: isPassed,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getUserExamResult = async (userId: string, examId: string) => {
  const { data, error } = await supabase
    .from("user_exam_results")
    .select("*")
    .eq("user_id", userId)
    .eq("exam_id", examId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching user exam result:", error);
    return null;
  }

  return data;
};
