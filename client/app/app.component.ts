import { Component } from '@angular/core';
import {EventService} from './services/event.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers:[EventService]
})

export class AppComponent { }
