
import BaseApi from "./_baseAPi";

export default class AdminOrdersApi extends BaseApi {
  baseUrl: string = "adminApi/";
  getUniqueFieldValues: any;
  constructor() {
    super();
  }

  async getAllOrders(status?: string , limit?: number, offset?: number){
    const data = await AdminOrdersApi.get(`${this.baseUrl}orderslist/?status=${status}&limit=${limit}&offset=${offset}`);
    return data;
  }

 async updateOrderStatus(order_id : number , status: string) {
    const data = await AdminOrdersApi.post(`${this.baseUrl}updateorderstatus/${order_id}`, {status});
    return data;
 }

}
