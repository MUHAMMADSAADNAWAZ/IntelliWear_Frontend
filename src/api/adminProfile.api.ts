
import { AdminProfilePayload } from "@dto/myprofile.dto";
import BaseApi from "./_baseAPi";

export default class AdminProfileApi extends BaseApi {
  baseUrl: string = "adminApi/profile/";
  getUniqueFieldValues: any;
  constructor() {
    super();
  }

  async getAdminProfile(){
    const data = await AdminProfileApi.get(`${this.baseUrl}`);
    return data;
  }

async updateAdminProfile(payload: AdminProfilePayload) {
    const data = await AdminProfileApi.patch(`${this.baseUrl}`, payload);
    return data;
}

}
