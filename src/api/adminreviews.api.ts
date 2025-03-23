
import BaseApi from "./_baseAPi";

export default class AdminReviewApi extends BaseApi {
  baseUrl: string = "adminApi/reviews/";
  getUniqueFieldValues: any;
  constructor() {
    super();
  }

  async getAllReviews(limit?: number, offset?: number){
    const data = await AdminReviewApi.get(`${this.baseUrl}?limit=${limit}&offset=${offset}`);
    return data;
  }

  async deleteSpecificReview(review_id: string){
    const data = await AdminReviewApi.delete(`${this.baseUrl}${review_id}/`);
    return data;
   }

}
