
import { AddToCartPayload } from "@dto/product.dto";

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

  async getCustomerCart(){
    const data = await CustomerProductsApi.get(`${this.baseUrl}cart/`);
    return data;
  }

  async addProductToCart(payload: AddToCartPayload){
    const data = await CustomerProductsApi.post(`${this.baseUrl}cart/` , payload);
    return data;
  }

  async deleteProductFromCart(cart_item_id: number){
    const data = await CustomerProductsApi.delete(`${this.baseUrl}remove-cart/` , {cart_item_id});
    return data;
  }

  async updateCart(payload : {cart_item_id: number , quantity: number}){
    const data = await CustomerProductsApi.patch(`${this.baseUrl}update-cart/` , payload);
    return data;
  }

  async giveReview(product_id: string , payload : {comment: string , rating: number}){
    const data = await CustomerProductsApi.post(`${this.baseUrl}giveReview/?product_id=${product_id}` , payload);
    return data;
  }

  async serahcImageProducts(formData: FormData){
    const data = await CustomerProductsApi.post(`${this.baseUrl}imageSearch/` , formData );
    return data;
  }

  async nlpSearchProducts(query: string){
    const data = await CustomerProductsApi.post(`${this.baseUrl}nlpSearch/` , {query} );
    return data;
  }

}
