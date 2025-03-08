import * as yup from "yup"

export class SignUpDto{
    name?: string;
    phone?: string;
    email?: string;
    password?: string;
    confirm_password?: string;

    static yupSchema(){
        return yup.object({
            name: yup.string().required("Please Enter your Name").nullable(),
            phone: yup.string()
            .required("Please Enter your 11 digit Phone Number")
            .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
            .nullable(),
            email: yup.string().required("Please Enter your Email").nullable(),
            password: yup.string().min(8).required("Please Enter Your Password").nullable(),
            confirm_password: yup.string().required("Please Enter Your Password").oneOf([yup.ref("password")] , "passwords must match").nullable(),
        })
    }

    static initialValues() {
        return {
            name: '',
            phone: '',
            email: '',
            password: '',
            confirm_password: '',
        };
    }
}

interface User {
    email: string,
    name: string,
    password: string,
    confirm_password: string,
}

export interface SignupPayload{
    user: User,
    phone: string
}