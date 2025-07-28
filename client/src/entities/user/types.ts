export interface User {
    id: string;
    name: string;
    surName: string;
    fullName: string;
    email: string;
    birthDate?: string | null;
    telephone?: string | null;
    employment?: string | null;
    userAgreement?: boolean | null;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface UserCreateDto {
    name: string;
    surName: string;
    password: string;
    fullName: string;
    email: string;
    birthDate?: string | null;
    telephone?: string | null;
    employment?: string | null;
    userAgreement?: boolean | null;
  }
  
  export interface UserPatchDto {
    name?: string;
    surName?: string;
    fullName?: string;
    birthDate?: string | null;
    telephone?: string | null;
    employment?: string | null;
    userAgreement?: boolean | null;
  }
  
  export interface LoginDto {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    message: string;
  }