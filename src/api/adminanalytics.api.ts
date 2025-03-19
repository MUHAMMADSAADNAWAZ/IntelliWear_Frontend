
import BaseApi from "./_baseAPi";

export default class AdminAnalyticsApi extends BaseApi {
  baseUrl: string = "adminApi/";
  getUniqueFieldValues: any;
  constructor() {
    super();
  }

  async getAdminAnalytics(filter: string){
    const data = await AdminAnalyticsApi.get(`${this.baseUrl}adminanalytics/?filter=${filter}`);
    return data;
  }

}
