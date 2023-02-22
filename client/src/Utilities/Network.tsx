import axios from 'axios'



export const getRequest =  async (method:string):Promise<any> => {
  try {
    return (await axios.get(method)).data.data;
  }catch(err:any){
    return []
  }
}

export const postRequest =  async (method:string,data:any):Promise<any> => {
  try {
    return (await axios.post(method,data)).data.data;
  }catch(err:any){
    return err
  }
}