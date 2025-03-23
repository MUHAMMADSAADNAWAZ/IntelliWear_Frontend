import * as yup from "yup"

export class MakeReviewDto {
    rating: number = 0;
    comment: string = '';

    static yupSchema() {
        return yup.object({
            rating: yup.number()
                .min(1, "Please select a rating")
                .required("Rating is required")
                .test('not-zero', 'Rating is required', value => value !== 0),
            comment: yup.string()
                .required("Comment is required")
                .min(10, "Comment must be at least 10 characters"),
        })
    }

    static initialValues() {
        return {
            rating: 0,
            comment: '',
        };
    }
}

export interface ReviewProps{
    id: string;
    product: string;
    product_name: string;
    user: number;
    user_name: string;
    rating: number;
    comment: string;
    created_at: string;
}