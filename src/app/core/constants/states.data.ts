import { State } from "../models/state.interface"

const states : Record<string,State[]>= {

  US: [
    { name: 'California', code: 'CA' },
    { name: 'Florida', code: 'FL' },
    { name: 'Illinois', code: 'IL' },
    { name: 'New York', code: 'NY' },
    { name: 'Texas', code: 'TX' },
    { name: 'Washington', code: 'WA' }
  ]
}


 export function getStatesByCountry(code : string){
  return  states[code]
 }

