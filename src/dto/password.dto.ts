import * as yup from "yup"

export class PasswordDto{
    password?: string;
    confirm_password?: string;

    static yupSchema(){
        return yup.object({
            password: yup.string().min(8).required("Please Enter Your Password").nullable(),
            confirm_password: yup.string().required("Please Enter Your Password").oneOf([yup.ref("password")] , "passwords must match").nullable(),
        })
    }

    static initialValues() {
        return {
            password: '',
            confirm_password: '',
        };
    }
}