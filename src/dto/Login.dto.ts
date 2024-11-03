import * as yup from "yup"

export class LoginDto{
    email?: string;
    password?: string;

    static yupSchema(){
        return yup.object({
            email: yup.string().required("Please Enter your Email").nullable(),
            password: yup.string().min(8).required("Please Enter Your Password").nullable(),
        })
    }

    static initialValues() {
        return {
            email: '',
            password: '',
        };
    }
}