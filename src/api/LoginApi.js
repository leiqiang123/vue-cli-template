import HttpHandler from "@/handler/HttpHandler"

export default class LoginApi {

  constructor() {
    this.http = new HttpHandler()
  }

  //登录
  login(url, data){
    return this.http.post(url, data)
  }
}
