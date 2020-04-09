
declare var moment;

export class TimeUtil {

  static format(format:string,date:Date){
    return moment(date.getTime()).format(format)
  }

  static parse(format:string,date:string){
    return new Date(moment(date,format).valueOf())
  }

}
