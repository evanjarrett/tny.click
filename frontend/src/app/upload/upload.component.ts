import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {DropzoneConfigInterface} from "ngx-dropzone-wrapper";

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

    config: DropzoneConfigInterface;

    constructor(
        private router: Router,
        private service: ApiService,
        private zone: NgZone
    ) {
        this.config = {
            url: this.service.getUploadURL(),
            headers: this.service.getTokenHeader(),
            acceptedFiles: 'image/*'
        };
        this.config.headers["Cache-Control"] = "";
        this.config.headers["X-Requested-With"] = "";
    }

    ngOnInit() {
    }

    imageURLReturned(event) {
        const url = event[1];
        const rout = url.split("/").pop().split(".")[0];
        this.zone.run(() => this.router.navigate(['/image', rout]));
    }
}
