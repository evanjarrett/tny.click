import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UploadService} from "../upload/upload.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-imagedetail',
    templateUrl: './imagedetail.component.html',
    styleUrls: ['./imagedetail.component.css']
})
export class ImagedetailComponent implements OnInit {
    private image_url: string;
    private sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: UploadService
    ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.image_url = this.service.imageSourceFromId(params.id);
        });
    }
}
