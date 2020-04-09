


export class HttpResponseData<T> {

  static RESPONSE_CODE = {
    OK:0,
    HTTP_ERROR:-1
  }

  code:number
  msg:string
  data:T
}
