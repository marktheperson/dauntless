import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DauntlessService } from '../../dauntless.service';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss'],
    providers: [DauntlessService],
    host: {
        '(window:resize)': 'onResize($event)'
    }
})

export class ScheduleComponent implements OnInit {

    mobileView: boolean;
    fullSchedule: any;
    daySchedule: any;
    dayIndex: any;
    currentDayOfWeek: number;

    constructor(private _dauntless:DauntlessService) {
        this.currentDayOfWeek = new Date().getDay();
        this.dayIndex = {
            0: 6,
            1: 0,
            2: 1,
            3: 2,
            4: 3,
            5: 4,
            6: 5
        };
        this.mobileView = false;
        this.fullSchedule = [];
        this.daySchedule = [];
        this._dauntless.getSchedule().subscribe( (r) => {
            let res = r.json()? r.json() : [];
            res = res.filter(dayRow => dayRow.length > 1);
            this.fullSchedule = res.map( (dayRow) => { if (dayRow.length < 8) { 
                dayRow = dayRow.concat( Array.from({ length: 8 - dayRow.length }).map( () => "" ) );
             } return dayRow; } );
            this.daySchedule = this.fullSchedule.filter( 
                filtRow =>  filtRow[ (this.dayIndex[this.currentDayOfWeek] + 1 ) ] != ""
            ).map( (dayRow) => {
                return {
                    "Time": dayRow[0],
                    "EventName": this._handleDayClanEvent( dayRow[ (this.dayIndex[this.currentDayOfWeek] + 1 ) ] )
                }
            });
        });
        
    }

        ngOnInit() {
            if (window.innerWidth <= 768) {
                this.mobileView = true;
            } else {
                this.mobileView = false;
            }
        }

        onResize(event){
            if (event.target.innerWidth <= 768) {
                this.mobileView = true;
            } else {
                this.mobileView = false;
            }
        }

        handleClanEvent(event) {
            let returnValue = "";
            switch(event) {
                case "DR":
                    returnValue = "nc-user-run";
                    break;
                case "OS":
                    returnValue = "nc-vector";
                    break;
                case "FS":
                    returnValue = "nc-istanbul";
                    break;
                case "CB":
                    returnValue = "nc-bold";
                    break;
                case "PH":
                    returnValue = "nc-ambulance";
                    break;
                case "AU":
                    returnValue = "nc-shop";
                    break;
                default:
                    returnValue = "nc-alert-circle-i";
                    break;
            }
            return returnValue;
        }

        _handleDayClanEvent(event) {
            let returnValue = "";
            switch(event) {
                case "DR":
                    returnValue = "Full Dungeon Run";
                    break;
                case "OS":
                    returnValue = "Open Siege";
                    break;
                case "FS":
                    returnValue = "Fortress Siege";
                    break;
                case "CB":
                    returnValue = "Core Buff";
                    break;
                case "PH":
                    returnValue = "Ally Dungeon Help";
                    break;
                default:
                    returnValue = "Something is happening";
                    break;
            }
            return returnValue; 
        }


    }