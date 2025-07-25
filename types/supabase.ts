// types/supabase.ts
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      messages: {
        Row: {
          id: number;
          name: string;
          email: string;
          message: string;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          message: string;
        };
        Update: Partial<Database['public']['Tables']['messages']['Insert']>;
      };
    };
  };
};