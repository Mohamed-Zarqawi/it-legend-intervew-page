export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      comments: {
        Row: {
          comment: string | null;
          created_at: string;
          id: number;
          user_avatar: string | null;
          user_name: string | null;
        };
        Insert: {
          comment?: string | null;
          created_at?: string;
          id?: number;
          user_avatar?: string | null;
          user_name?: string | null;
        };
        Update: {
          comment?: string | null;
          created_at?: string;
          id?: number;
          user_avatar?: string | null;
          user_name?: string | null;
        };
        Relationships: [];
      };
      courses: {
        Row: {
          category: string | null;
          certificate: number | null;
          created_at: string;
          description: string | null;
          id: string;
          language: string | null;
          teacher_name: string | null;
          thumbnail_url: string | null;
          title: string;
          weeks: number | null;
        };
        Insert: {
          category?: string | null;
          certificate?: number | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          language?: string | null;
          teacher_name?: string | null;
          thumbnail_url?: string | null;
          title: string;
          weeks?: number | null;
        };
        Update: {
          category?: string | null;
          certificate?: number | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          language?: string | null;
          teacher_name?: string | null;
          thumbnail_url?: string | null;
          title?: string;
          weeks?: number | null;
        };
        Relationships: [];
      };
      lessons: {
        Row: {
          course_id: string | null;
          created_at: string;
          duration: string;
          id: string;
          position_order: number;
          progress_percentage: number;
          title: string;
          video_url: string | null;
          week: string;
        };
        Insert: {
          course_id?: string | null;
          created_at?: string;
          duration: string;
          id?: string;
          position_order: number;
          progress_percentage: number;
          title: string;
          video_url?: string | null;
          week: string;
        };
        Update: {
          course_id?: string | null;
          created_at?: string;
          duration?: string;
          id?: string;
          position_order?: number;
          progress_percentage?: number;
          title?: string;
          video_url?: string | null;
          week?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      user_lesson_progress: {
        Row: {
          id: string;
          is_completed: boolean | null;
          lesson_id: string | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          is_completed?: boolean | null;
          lesson_id?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          is_completed?: boolean | null;
          lesson_id?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_lesson_progress_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "lessons";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          email: string;
          first_name: string | null;
          id: string;
          last_name: string | null;
          role: string | null;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          email: string;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          role?: string | null;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          email?: string;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          role?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_course_progress_details: {
        Args: { p_course_id: string; p_user_id: string };
        Returns: {
          completed_count: number;
          completed_lesson_ids: string[];
          progress_percentage: number;
          total_lessons: number;
        }[];
      };
      toggle_lesson_progress: {
        Args: {
          p_course_id: string;
          p_is_completed: boolean;
          p_lesson_id: string;
          p_user_id: string;
        };
        Returns: {
          completed_count: number;
          progress_percentage: number;
          total_lessons: number;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
