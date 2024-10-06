import { Injectable } from '@angular/core';
import { Housinglocation} from './housinglocation'; 

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = 'http://localhost:3000/locations';

  async getAllHousingLocation(): Promise<Housinglocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: Number): Promise <Housinglocation | undefined>{
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {}; 
  } 
  constructor() { }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Application submitted for ${firstName} ${lastName} at ${email}`);
  }
}
