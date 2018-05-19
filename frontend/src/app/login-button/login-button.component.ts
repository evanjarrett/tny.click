import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {LoginService} from "../login/login.service";
import {LoginComponent} from "../login/login.component";

@Component({
    selector: 'app-login-button',
    templateUrl: './login-button.component.html',
    styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

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
        this.hasToken = sessionStorage.getItem("token") !== null;
    }

    public openDialog(): void {
        this.dialog.open(LoginComponent, {
            width: '400px',
            data: {}
        });
    }
}
