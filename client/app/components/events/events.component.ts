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
    receiveDate: string;
    receiptDate: string;
    age: string;
    sex: string;
    autorizationNumber: string;
    DosageText: string;
    medicinalProduct: string;
    drugIndication: string;
    meddraPrimaryTerm: string;
    safetyReportId: string;
    companyNumber: string;
    
    constructor(private eventService:EventService){
        this.eventService.getEvents()
            .subscribe(events => {
                this.events = events;
            });
    }
    
    addEvent(event){
        console.log(event);
        event.preventDefault();
        var newEvent = {
            receiveDate: this.receiveDate,
            receiptDate: this.receiptDate,
            patient: {
                drugs: [{
                    autorizationNumber: this.autorizationNumber,
                    DosageText: this.DosageText,
                    medicinalProduct: this.medicinalProduct,
                    drugIndication: this.drugIndication
                }],
                reaction: [{
                    meddraPrimaryTerm: this.meddraPrimaryTerm
                }],
                age: this.age,
                sex: this.sex
            },
            safetyReportId: this.safetyReportId,
            companyNumber: this.companyNumber
        }
        
        this.eventService.addEvent(newEvent)
            .subscribe(event => {
                this.events.push(event);
                // this.title = '';
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
    
    // updateStatus(event){
    //     var _event = {
    //         _id:event._id,
    //         title: event.title,
    //         isDone: !event.isDone
    //     };
        
    //     this.eventService.updateStatus(_event).subscribe(data => {
    //         event.isDone = !event.isDone;
    //     });
    // }
}
