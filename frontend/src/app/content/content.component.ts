import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";


@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

    public hasToken: boolean = false;

    constructor(
        private service: ApiService
    ) {
        this.service.hasToken.subscribe(value => {
            this.hasToken = value;
        });
    }

    ngOnInit() {
        this.hasToken = localStorage.getItem("account") !== null;
    }

}
