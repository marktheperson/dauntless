import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { HomeComponent } from './home.component';
import { ScheduleComponent } from './schedule/schedule.component';

import { ComponentsModule } from '../components/components.module';
import { AttendanceComponent } from './attendance/attendance.component';
import { PointsComponent } from './points/points.component';
import { NameFilterPipe } from '../dauntless.pipe';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        ComponentsModule,
        NgbModule,
        HttpModule
    ],
    declarations: [ 
        HomeComponent, 
        ScheduleComponent,
        AttendanceComponent,
        PointsComponent,
        NameFilterPipe 
    ],
    exports:[ 
        HomeComponent 
    ],
    providers: []
})
export class HomeModule { }
