import { Component } from '@angular/core';
import {EventService} from '../../services/event.service';
import {Event} from '../../../Event';

@Component({
  moduleId: module.id,
  selector: 'events',
  templateUrl: 'events.component.html'
})

export class EventsComponent { 
    events: Event[];
    title: string;
    receiveDate: string;
    receiptDate: string;
    
    constructor(private eventService:EventService){
        this.eventService.getEvents()
            .subscribe(events => {
                this.events = events;
            });
    }
    
    addEvent(event){
        event.preventDefault();
        var newEvent = {
            receiveDate: this.receiveDate,
            receiptDate: this.receiptDate
            // title: this.title,
            // isDone: false
        }
        
        this.eventService.addEvent(newEvent)
            .subscribe(event => {
                this.events.push(event);
                this.title = '';
            });
    }
    
    deleteEvent(id){
        var events = this.events;
        
        this.eventService.deleteEvent(id).subscribe(data => {
            if(data.n == 1){
                for(var i = 0;i < events.length;i++){
                    if(events[i]._id == id){
                        events.splice(i, 1);
                    }
                }
            }
        });
    }
    
    updateStatus(event){
        var _event = {
            _id:event._id,
            title: event.title,
            isDone: !event.isDone
        };
        
        this.eventService.updateStatus(_event).subscribe(data => {
            event.isDone = !event.isDone;
        });
    }
}
