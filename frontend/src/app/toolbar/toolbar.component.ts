import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../login/login.service";

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

    public title = "Tny.Click";
    public hasToken: boolean = false;

    constructor(
        private router: Router,
        private loginService: LoginService
    ) {
        this.loginService.hasToken.subscribe( value => {
            this.hasToken = value;
        });
    }

    ngOnInit() {
        this.hasToken = sessionStorage.getItem("token") !== null;
    }

    public navLogin() {
        this.router.navigate(['/login']);
    }
}
