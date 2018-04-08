import { Component, OnInit } from '@angular/core';
import { DauntlessService } from '../../dauntless.service';
import { SlicePipe } from '@angular/common';

@Component({
    selector: 'app-points',
    templateUrl: './points.component.html',
    providers: [DauntlessService],
    styleUrls: ['./points.component.scss']
})

export class PointsComponent implements OnInit {
    rows: any;
    userSearch: any;
    page: number;
    limit: number;

    constructor(private _dauntless: DauntlessService) {
        this.rows = [];
        this.userSearch = "";
        this.page = 1;
        this.limit = 10;

        this._dauntless.getPoints().subscribe((r) => {
            let res = r.json() ? r.json() : [];

            this.rows = res.map((item) => {
                return {
                    name: item[0],
                    'lw': item[2],
                    'te': item[3],
                    'tp': item[4],
                    'gt': item[5]
                }
            });

            this.rows.sort( function(name1, name2) {
                if ( parseInt(name1.gt) < parseInt(name2.gt) ){
                    return 1;
                }else if( parseInt(name1.gt) > parseInt(name2.gt) ){
                    return -1;
                }else{
                    return 0;	
                }
            });
        });


    }

    ngOnInit() {

    }

}