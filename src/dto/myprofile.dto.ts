import * as yup from "yup"

export class MyProfileDto{
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    address?: string;

    static yupSchema(){
        return yup.object({
            first_name: yup.string().nullable(),
            last_name: yup.string().nullable(),
            email: yup.string().nullable(),
            phone: yup.string().nullable(),
            address: yup.string().nullable(),
        })
    }

    static initialValues() {
        return {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
        };
    }
}