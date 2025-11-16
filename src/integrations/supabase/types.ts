export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      complaints: {
        Row: {
          admin_notes: string | null
          category: Database["public"]["Enums"]["complaint_category"]
          created_at: string | null
          description: string
          id: string
          is_anonymous: boolean | null
          is_initiative: boolean | null
          priority: Database["public"]["Enums"]["complaint_priority"] | null
          progress: number | null
          status: Database["public"]["Enums"]["complaint_status"] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          category: Database["public"]["Enums"]["complaint_category"]
          created_at?: string | null
          description: string
          id?: string
          is_anonymous?: boolean | null
          is_initiative?: boolean | null
          priority?: Database["public"]["Enums"]["complaint_priority"] | null
          progress?: number | null
          status?: Database["public"]["Enums"]["complaint_status"] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          category?: Database["public"]["Enums"]["complaint_category"]
          created_at?: string | null
          description?: string
          id?: string
          is_anonymous?: boolean | null
          is_initiative?: boolean | null
          priority?: Database["public"]["Enums"]["complaint_priority"] | null
          progress?: number | null
          status?: Database["public"]["Enums"]["complaint_status"] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "complaints_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          comments: string | null
          complaint_id: string
          created_at: string | null
          id: string
          rating: number
          user_id: string
        }
        Insert: {
          comments?: string | null
          complaint_id: string
          created_at?: string | null
          id?: string
          rating: number
          user_id: string
        }
        Update: {
          comments?: string | null
          complaint_id?: string
          created_at?: string | null
          id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_complaint_id_fkey"
            columns: ["complaint_id"]
            isOneToOne: false
            referencedRelation: "complaints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          name: string
          role: Database["public"]["Enums"]["app_role"]
          ticket_points: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          role?: Database["public"]["Enums"]["app_role"]
          ticket_points?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["app_role"]
          ticket_points?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          admin_id: string | null
          data: Json | null
          generated_on: string | null
          id: string
          type: string
        }
        Insert: {
          admin_id?: string | null
          data?: Json | null
          generated_on?: string | null
          id?: string
          type: string
        }
        Update: {
          admin_id?: string | null
          data?: Json | null
          generated_on?: string | null
          id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
    }
    Enums: {
      app_role: "student" | "faculty" | "admin"
      complaint_category:
        | "hostel"
        | "maintenance"
        | "exam"
        | "faculty"
        | "it"
        | "administration"
      complaint_priority: "urgent" | "normal" | "low"
      complaint_status: "pending" | "in_progress" | "resolved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "faculty", "admin"],
      complaint_category: [
        "hostel",
        "maintenance",
        "exam",
        "faculty",
        "it",
        "administration",
      ],
      complaint_priority: ["urgent", "normal", "low"],
      complaint_status: ["pending", "in_progress", "resolved", "rejected"],
    },
  },
} as const
