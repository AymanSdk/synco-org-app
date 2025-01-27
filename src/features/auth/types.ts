export type SignInFlow = "SignIn" | "SignUp";
export interface SignInFormInputs {
  email: string;
  password: string;
}

export interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export interface SignUpFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}