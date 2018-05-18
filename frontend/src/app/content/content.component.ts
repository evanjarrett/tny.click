import {Component, OnInit} from '@angular/core';

import {MatDialog} from '@angular/material';

import {UploadComponent} from '../upload/upload.component';
import {Router} from "@angular/router";


@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

    constructor(
        public dialog: MatDialog,
        private router: Router) {
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(UploadComponent, {
            width: '600px',
            height: '600px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    ngOnInit() {
    }

    public navLogin() {
        this.router.navigate(['/login']);
    }
}
