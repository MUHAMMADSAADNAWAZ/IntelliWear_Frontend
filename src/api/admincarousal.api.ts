
import BaseApi from "./_baseAPi";

export default class AdminCarouselApi extends BaseApi {
  baseUrl: string = "adminApi/carousel/";
  getUniqueFieldValues: any;
  constructor() {
    super();
  }

  async getAllCarousalImages(){
    const data = await AdminCarouselApi.get(`${this.baseUrl}`);
    return data;
  }

 async createCarousal(payload: FormData) {
    const data = await AdminCarouselApi.post(`${this.baseUrl}`, payload);
    return data;
 }

 async getSpecificCarousalImage(id : string){
    const data = await AdminCarouselApi.get(`${this.baseUrl}${id}/`);
    return data;
  }

 async updateSpecificCarousalImage(id : string , payload : FormData){
    const data = await AdminCarouselApi.put(`${this.baseUrl}${id}/` , payload);
    return data;
  }

 async updatePartialSpecificCarousalImage(id : string , payload : FormData){
    const data = await AdminCarouselApi.patch(`${this.baseUrl}${id}/` , payload) ;
    return data;
  }

 async deleteSpecificCarousalImage(id : string){
    const data = await AdminCarouselApi.delete(`${this.baseUrl}${id}/`);
    return data;
  }

 
}
