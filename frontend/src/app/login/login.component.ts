import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {LoginModel} from "./login.model";
import {TokenModel} from "./token.model";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loginModel = new LoginModel();

    constructor(
        private router: Router,
        private loginService: LoginService,
    ) {
    }

    ngOnInit() {
    }

    public login() : void {
        this.loginService.login(this.loginModel)
            .subscribe(ret => this.onLoginComplete(ret));
    }

    public onLoginComplete(ret: TokenModel) : void {
        sessionStorage.setItem("token", ret.token);
        this.loginService.hasToken.next(true);
        this.router.navigate(['']);
    }
}
