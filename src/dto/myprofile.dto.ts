import * as yup from "yup"

export class MyProfileDto{
    name?: string;
    email?: string;
    phone?: string;
    address?: string;

    static yupSchema(){
        return yup.object({
            name: yup.string().nullable(),
            email: yup.string().nullable(),
            phone: yup.string().nullable(),
            address: yup.string().nullable(),
        })
    }

    static initialValues() {
        return {
            name: '',
            email: '',
            phone: '',
            address: '',
        };
    }
}

export interface CustomerPayloadProps{
    name?: string;
    address?: string;
    email?: string;
    phone?: string;
}

export interface AdminProfilePayload {
    name: string;
    phone: string;
}

// redux toolkit interface

export interface AuthToken {
    token: string;
    expires_at: string;
}
export interface UserInfo {
    user_id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    profile_picture: string | null;
    user_type: string;
  }
  
export  interface AuthResponse {
    token: {
      access_token: AuthToken;
      refresh_token: AuthToken;
    };
    user_info: UserInfo;
}
  
