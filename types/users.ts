// /types/user.ts

export interface UserMetadata {
  trial_started_at?: string;
}

export interface User {
  user_metadata?: UserMetadata;
}