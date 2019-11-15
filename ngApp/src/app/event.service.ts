import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  private events_url="http://localhost:3000/api/events"
  private specialeven_url="http://localhost:3000/api/special"
  constructor(private http:HttpClient) { }

  getevents(){
    return this.http.get(this.events_url)
  }
  getspecialevents(){
    return this.http.get(this.specialeven_url)
  }
}
