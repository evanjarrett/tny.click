import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginModel} from "./login.model";
import {Account} from "../models/account";
import {MatDialogRef} from "@angular/material";
import {ApiService} from "../services/api.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginModel = new LoginModel();

    constructor(
        private router: Router,
        private service: ApiService,
        public dialogRef: MatDialogRef<LoginComponent>,
        private zone: NgZone
    ) {
    }

    ngOnInit() {
    }

    public onNoClick(): void {
        this.dialogRef.close();
    }

    public login(): void {
        this.service.login(this.loginModel)
            .subscribe(ret => this.onLoginComplete(ret));
    }

    public onLoginComplete(ret: Account): void {
        localStorage.setItem("account",  JSON.stringify(ret));
        this.zone.run(() => this.dialogRef.close());
        this.service.hasToken.next(true);
        this.router.navigate(['']);
    }
}
