// /types/user.ts

export interface UserMetadata {
  trial_started_at?: string;
}

export interface User {
  user_metadata?: UserMetadata;
  id: string;
  email?: string;
  // Add any other relevant fields returned by Supabase
}