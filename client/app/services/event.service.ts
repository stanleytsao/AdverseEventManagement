import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService{
    constructor(private http:Http){
        console.log('Event Service Initialized...');
    }
    
    getEvents(){
        return this.http.get('/api/events')
            .map(res => res.json());
    }
    
    addEvent(newEvent){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/event', JSON.stringify(newEvent), {headers: headers})
            .map(res => res.json());
    }
    
    deleteEvent(id){
        return this.http.delete('/api/event/'+id)
            .map(res => res.json());
    }
    
    updateStatus(event){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/event/'+event._id, JSON.stringify(event), {headers: headers})
            .map(res => res.json());
    }
}