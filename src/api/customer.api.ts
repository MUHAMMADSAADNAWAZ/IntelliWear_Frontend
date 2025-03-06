
import { CustomerPayloadProps } from "@dto/myprofile.dto";
import BaseApi from "./_baseAPi";

export default class CustomerApi extends BaseApi {
  baseUrl: string = "customer/";
  getUniqueFieldValues: any;
  constructor() {
    super();
  }

  async getCustomerInfo() {
    const data = await CustomerApi.get(`${this.baseUrl}`);
    return data;
  }

  async updateCustomerInfo(payload: CustomerPayloadProps) {
    const data = await CustomerApi.patch(`${this.baseUrl}` , payload);
    return data;
  }

  async deleteCustomer() {
    const data = await CustomerApi.delete(`${this.baseUrl}`);
    return data;
  }

}
