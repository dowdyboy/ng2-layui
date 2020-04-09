
export class Url {

  constructor(private orgUrl:string){}

  get(...vals):string{
    let url = this.orgUrl
    for(let i=0;i<vals.length;i++)
    {
      url = url.replace('$'+i,vals[i])
    }
    return url
  }
}
