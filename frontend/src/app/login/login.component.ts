import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {LoginModel} from "./login.model";
import {TokenModel} from "./token.model";
import {MatDialogRef} from "@angular/material";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginModel = new LoginModel();

    constructor(
        private router: Router,
        private loginService: LoginService,
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
        this.loginService.login(this.loginModel)
            .subscribe(ret => this.onLoginComplete(ret));
    }

    public onLoginComplete(ret: TokenModel): void {
        sessionStorage.setItem("token", ret.token);
        this.zone.run(() => this.dialogRef.close());
        this.loginService.hasToken.next(true);
        this.router.navigate(['']);
    }
}
