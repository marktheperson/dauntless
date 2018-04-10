import { Component, OnInit } from '@angular/core';
import { DauntlessService } from '../../dauntless.service';
import { SlicePipe } from '@angular/common';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    providers: [DauntlessService],
    styleUrls: ['./attendance.component.scss']
})

export class AttendanceComponent implements OnInit {

    rows: any;
    userSearch: any;
    page: number;
    limit: number;

    constructor(private _dauntless: DauntlessService) {
        this.rows = [];
        this.userSearch = "";
        this.page = 1;
        this.limit = 10;

        this._dauntless.getGroupsAndAttendance().subscribe((r) => {
            let res = r.json() ? r.json() : [];

            this.rows = res.map((item) => {
                return {
                    name: item[0],
                    team: item[1],
                    'm': item[2],
                    't': item[3],
                    'w': item[4],
                    'th': item[5],
                    "f": item[6],
                    "sa": item[7],
                    "su": item[8],
                    "fort": item[9]
                }
            });

            this.rows.sort(function (name1, name2) {
                if (name1.team < name2.team) {
                    return 1;
                } else if (name1.team > name2.team) {
                    return -1;
                } else {
                    return 0;
                }
            });
        });

    }

    ngOnInit() {

    }

    insertNumberSpace(team) {
        if (team.trim().indexOf(' ') == -1) {
            return [team.slice(0, team.length - 1), " ", team.slice(team.length - 1)].join('');
        } else {
            return team;
        }
    }

    teamColorSelector(team) {
        if (team.toLowerCase().includes('green')) {
            return 'team-green';
        }

        if (team.toLowerCase().includes('red')) {
            return 'team-red';
        }

        if (team.toLowerCase().includes('purple')) {
            return 'team-purple';
        }
    }

    attendanceColor(item) {
        let returnValue = "";
        if (item != undefined && item != "") {
            switch (item.toLowerCase()) {
                case "x":
                    returnValue = "table-success";
                    break;
                case "p":
                    returnValue = "table-warning";
                    break;
                case "a":
                    returnValue = "table-danger";
                    break;
                default:
                    returnValue = "";
            }
        }

        return returnValue;
    }

}