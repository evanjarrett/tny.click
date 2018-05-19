import {Component, OnInit} from '@angular/core';

import {MatDialog} from '@angular/material';

import {UploadComponent} from '../upload/upload.component';
import {LoginService} from "../login/login.service";


@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

    public hasToken: boolean = false;

    constructor(
        public dialog: MatDialog,
        private loginService: LoginService
    ) {
        this.loginService.hasToken.subscribe(value => {
            this.hasToken = value;
        });
    }

    ngOnInit() {
        this.hasToken = localStorage.getItem("account") !== null;
    }

    openDialog(): void {
        this.dialog.open(UploadComponent, {
            width: '600px',
            height: '600px',
            data: {}
        });
    }

}
