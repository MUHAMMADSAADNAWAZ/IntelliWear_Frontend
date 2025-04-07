
import BaseApi from "./_baseAPi";

export default class AdminReturnOrderRequestsApi extends BaseApi {
  baseUrl: string = "adminApi/";
  getUniqueFieldValues: any;
  constructor() {
    super();
  }

  async getAllRequests(){
    const data = await AdminReturnOrderRequestsApi.get(`${this.baseUrl}admin/return-requests/`);
    return data;
  }
  async getSpecificRequests(id: number){
    const data = await AdminReturnOrderRequestsApi.get(`${this.baseUrl}admin/return-requests/${id}/`);
    return data;
  }
  async updateRequestStatus(id: number , status: string){
    const data = await AdminReturnOrderRequestsApi.patch(`${this.baseUrl}return-request/${id}/` , {status});
    return data;
  }

}
