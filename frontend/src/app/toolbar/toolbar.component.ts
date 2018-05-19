import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Account} from "../models/account";

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

    public title = "Tny.Click";
    private account: Account;

    constructor(
        private router: Router
    ) {
        this.account = JSON.parse(localStorage.getItem("account"));
    }

    ngOnInit() {
    }

    navigateAccount() {

    }

    navigateHome() {
        this.router.navigate(["/"]);
    }
}
