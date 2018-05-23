import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Image} from "../models/image";
import {environment} from "../../environments/environment";
import {ApiService} from "../services/api.service";

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
        private service: ApiService
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
        window.open(this.getImageURL(), '_blank');
    }

    public getImageURL(): string {
        if (this.image) {
            return environment.apiUrl + this.image.image;
        }
        return "";
    }
}
