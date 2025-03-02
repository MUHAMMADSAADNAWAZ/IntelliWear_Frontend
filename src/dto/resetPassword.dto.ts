import * as yup from "yup"

export class ResetPasswordDto{
    new_password?: string;
    confirm_password?: string;

    static yupSchema(){
        return yup.object({
            new_password: yup.string().min(8).required("Please Enter Your Password").nullable(),
            confirm_password: yup.string().required("Please Enter Your Password").oneOf([yup.ref("new_password")] , "passwords must match").nullable(),
        })
    }

    static initialValues() {
        return {
            new_password: '',
            confirm_password: '',
        };
    }
}