
import BaseApi from "./_baseAPi";

export default class AdminCustomerListingApi extends BaseApi {
  baseUrl: string = "adminApi/customers/";
  getUniqueFieldValues: any;
  constructor() {
    super();
  }

  async getAllCustomers(limit?: number, offset?: number){
    const data = await AdminCustomerListingApi.get(`${this.baseUrl}?limit=${limit}&offset=${offset}`);
    return data;
  }

  async getSpecificCustomer(id: string){
    const data = await AdminCustomerListingApi.get(`${this.baseUrl}${id}/`);
    return data;
   }

  async deleteSpecificCustomer(id: string){
    const data = await AdminCustomerListingApi.delete(`${this.baseUrl}${id}/`);
    return data;
   }

}
