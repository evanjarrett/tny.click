import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UploadService} from "../upload/upload.service";
import {Subscription} from "rxjs/Subscription";
import {Image} from "../models/image";

@Component({
    selector: 'app-imagedetail',
    templateUrl: './imagedetail.component.html',
    styleUrls: ['./imagedetail.component.css']
})
export class ImagedetailComponent implements OnInit {
    private image: Image;
    private sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: UploadService
    ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.service.getImage(params.id).subscribe(
                (data: Image) => {
                    this.image = data
                }
            )
        });
    }

    openRaw() {
        window.open(this.image.image, '_blank');
    }
}
