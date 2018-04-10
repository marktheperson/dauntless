import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()

export class DauntlessService {

  constructor(private _http:Http) { 

  }

  getSchedule():Observable<any> {
    return this._http.get('http://api.dauntlessclan.com/schedule');
  }

  getPoints():Observable<any> {
    return this._http.get('http://api.dauntlessclan.com/points');
  }

  getGroupsAndAttendance():Observable<any> {
    return this._http.get('http://api.dauntlessclan.com/groupsAndAttendance');
  }

}