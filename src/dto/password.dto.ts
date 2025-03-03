import * as yup from "yup"

export class PasswordDto{
    old_password?: string;
    new_password?: string;
    confirm_password?: string;

    static yupSchema(){
        return yup.object({
            old_password: yup.string().min(8).required("Please enter your previous Password").nullable(),
            new_password: yup.string().min(8).required("Please enter your new Password").nullable(),
            confirm_password: yup.string().required("Please Enter Your Password").oneOf([yup.ref("new_password")] , "passwords must match").nullable(),
        })
    }

    static initialValues() {
        return {
            old_password: '',
            new_password: '',
            confirm_password: '',
        };
    }
}