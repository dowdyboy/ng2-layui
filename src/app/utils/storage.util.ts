

export class StorageUtil {

  static getLocalStorage(key:string){
    if(window.localStorage){
      return window.localStorage.getItem(key)
    }else return null
  }
  static setLocalStorage(key:string,value:string){
    if(window.localStorage){
      window.localStorage.setItem(key,value)
    }
  }
  static removeLocalStorage(key:string){
    if(window.localStorage){
      window.localStorage.removeItem(key)
    }
  }

}
