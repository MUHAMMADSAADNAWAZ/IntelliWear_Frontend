
import { OrderDataPayload } from "@dto/checkout.dto";

import BaseApi from "./_baseAPi";

export default class CustomerOrdersApi extends BaseApi {
  baseUrl: string = "customer/";
  getUniqueFieldValues: any;
  constructor() {
    super();
  }

  async getCustomerOrder(){
    const data = await CustomerOrdersApi.get(`${this.baseUrl}orders/`);
    return data;
  }
  
  async placeOrder(payload: OrderDataPayload){
    const data = await CustomerOrdersApi.post(`${this.baseUrl}place-orderStripe/` , payload);
    return data;
  }

  async cancelOrder(order_id: number){
    const data = await CustomerOrdersApi.post(`${this.baseUrl}cancel-order/${order_id}/` , {});
    return data;
  }


}
