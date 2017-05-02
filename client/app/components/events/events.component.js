"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var event_service_1 = require('../../services/event.service');
var EventsComponent = (function () {
    function EventsComponent(eventService) {
        var _this = this;
        this.eventService = eventService;
        this.eventService.getEvents()
            .subscribe(function (events) {
            _this.events = events;
        });
    }
    EventsComponent.prototype.addEvent = function (event) {
        var _this = this;
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
        };
        this.eventService.addEvent(newEvent)
            .subscribe(function (event) {
            _this.events.push(event);
            location.reload();
        });
    };
    EventsComponent.prototype.deleteEvent = function (id) {
        var events = this.events;
        this.eventService.deleteEvent(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < events.length; i++) {
                    if (events[i]._id == id) {
                        events.splice(i, 1);
                    }
                }
            }
        });
    };
    EventsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'events',
            templateUrl: 'events.component.html'
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService])
    ], EventsComponent);
    return EventsComponent;
}());
exports.EventsComponent = EventsComponent;
//# sourceMappingURL=events.component.js.map