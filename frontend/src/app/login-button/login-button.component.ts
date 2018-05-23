import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {LoginComponent} from "../login/login.component";
import {ApiService} from "../services/api.service";

@Component({
    selector: 'app-login-button',
    templateUrl: './login-button.component.html',
    styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

    public hasToken: boolean = false;

    constructor(
        public dialog: MatDialog,
        private service: ApiService
    ) {
        this.service.hasToken.subscribe(value => {
            this.hasToken = value;
        });
    }

    ngOnInit() {
        this.hasToken = localStorage.getItem("account") !== null;
    }

    public openLoginDialog(): void {
        this.dialog.open(LoginComponent, {
            width: '400px',
            data: {}
        });
    }
}
