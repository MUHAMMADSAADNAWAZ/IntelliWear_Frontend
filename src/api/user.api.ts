import { LoginDto } from "@dto/Login.dto";
import { SignUpDto } from "@dto/Signup.dto";
import { ForgotPasswordDto } from "@dto/forgetPassword.dto";
import { ResetPasswordDto } from "@dto/resetPassword.dto";

import BaseApi from "./_baseAPi";

export default class UserApi extends BaseApi {
  baseUrl: string = "";
  getUniqueFieldValues: any;
  constructor() {
    super();
  }

  async signup(payload: SignUpDto) {
    const data = await UserApi.post(`${this.baseUrl}signup/`, payload);
    return data;
  }

  async login(payload: LoginDto) {
    const data = await UserApi.post(`${this.baseUrl}login/`, payload);
    return data;
  }

  async forgotPassword(payload : ForgotPasswordDto){
    const data = await UserApi.post(`${this.baseUrl}password-reset/` , payload)
    return data
  }

  async resetPassword(payload : ResetPasswordDto , uidb64 : string , token : string){
    const data = await UserApi.post(`${this.baseUrl}password-reset-confirm/${uidb64}/${token}/` , payload)
    return data
  }

  async refreshToken(refresh: string){
    const data = await UserApi.post(`${this.baseUrl}refreshtoken/` , {refresh})
    return data
  }

  async updatePassword(payload : ResetPasswordDto){
    const data = await UserApi.post(`${this.baseUrl}/change-password/` , payload)
    return data
  }

}
