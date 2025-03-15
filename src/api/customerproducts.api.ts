
import BaseApi from "./_baseAPi";

export default class CustomerProductsApi extends BaseApi {
  baseUrl: string = "customer/";
  getUniqueFieldValues: any;
  constructor() {
    super();
  }

  async getHomeProducts(){
    const data = await CustomerProductsApi.get(`${this.baseUrl}home/`);
    return data;
  }

  async getClothesProducts(gender?: string , page?: number){
    const data = await CustomerProductsApi.get(`${this.baseUrl}clothes/?gender=${gender}&page_size=32&page=${page}`);
    return data;
  }

  async getShoesProducts(gender?: string , page?: number){
    const data = await CustomerProductsApi.get(`${this.baseUrl}shoes/?gender=${gender}&page_size=32&page=${page}`);
    return data;
  }

  async getAccessoriesProducts(gender?: string , page?: number){
    const data = await CustomerProductsApi.get(`${this.baseUrl}accessories/?gender=${gender}&page_size=32&page=${page}`);
    return data;
  }

  async getGenderBasedProducts(gender?: string){
    const data = await CustomerProductsApi.get(`${this.baseUrl}products/${gender}/`);
    return data;
  }

  async getProductDetails(product_id?: string){
    const data = await CustomerProductsApi.get(`${this.baseUrl}product/${product_id}/`);
    return data;
  }


}
