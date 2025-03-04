
import BaseApi from "./_baseAPi";

export default class AdminProductsApi extends BaseApi {
  baseUrl: string = "adminApi/products/";
  getUniqueFieldValues: any;
  constructor() {
    super();
  }

  async getAllProducts(product_type?: string , limit?: number, offset?: number){
    const data = await AdminProductsApi.get(`${this.baseUrl}?product_type=${product_type}&limit=${limit}&offset=${offset}`);
    return data;
  }

 async createProduct(payload: FormData) {
    const data = await AdminProductsApi.post(`${this.baseUrl}`, payload);
    return data;
 }

 async getSpecificProduct(id: string){
  const data = await AdminProductsApi.get(`${this.baseUrl}${id}/`);
  return data;
 }

 async updateProduct(payload: FormData , id:string) {
  const data = await AdminProductsApi.put(`${this.baseUrl}${id}/`, payload);
  return data;
}

 async updatePartialProduct(payload: FormData , id:string) {
  const data = await AdminProductsApi.patch(`${this.baseUrl}${id}/`, payload);
  return data;
  }

  async deleteProduct(id: string){
    const data = await AdminProductsApi.delete(`${this.baseUrl}${id}/`);
    return data;
   }

}
