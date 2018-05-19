import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

    public title = "Tny.Click";

    constructor(
        private router: Router
    ) {
    }

    ngOnInit() {
    }

}
