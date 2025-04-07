import BaseApi from "./_baseAPi";

export default class ReturnOrdersApi extends BaseApi {
  baseUrl: string = "customer/";
  getUniqueFieldValues: any;
  constructor() {
    super();
  }
  
  async ReturnRequest(formData: FormData){
    const data = await ReturnOrdersApi.post(`${this.baseUrl}return-requests/` , formData);
    return data;
  }
  
}

//   async getCustomerOrder(){
//     const data = await CustomerOrdersApi.get(`${this.baseUrl}orders/`);
//     return data;
//   }