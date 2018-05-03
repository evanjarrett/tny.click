import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title: string = 'Tny.Click';
    show: boolean = true;

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                if (e.url === "/") {
                    this.show = true;
                } else {
                    this.show = false;
                }
            }
        })
    }
}
