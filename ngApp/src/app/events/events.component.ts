import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
events:any=[]
  constructor( private eventserver:EventService) { }

  ngOnInit() {
    this.eventserver.getevents().subscribe(
      res=>{this.events=res; console.log(this.events)},
      err=>console.log(err)
    )
  }

}
