export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  phoneCode?: string;
  birthday?: string;
  gender?: "male" | "female";
  role?: string;
  is_blocked: boolean;
  created_at: string;
};
