import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {
  url = 'http://localhost:6071/api/values?token=';
  constructor(private http: HttpClient) { }

  /**
   * Metodo test para invocar al backend
   * @param token 
   */
  public getValues( token = 'xxx' ) {
    return this.http.get<string[]>(this.url+token);
  }
}
