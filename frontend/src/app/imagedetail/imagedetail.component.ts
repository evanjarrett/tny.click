import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Image} from "../models/image";
import {environment} from "../../environments/environment";
import {ApiService} from "../services/api.service";
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'app-imagedetail',
    templateUrl: './imagedetail.component.html',
    styleUrls: ['./imagedetail.component.css']
})
export class ImagedetailComponent implements OnInit {
    image: Image;
    private sub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ApiService,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.service.getImage(params.id).subscribe(
                (data: Image) => {
                    this.image = data
                },
                error => this.handleError(error)
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

    public handleError(error: any) {
        this.router.navigate(["/"]);
        this.snackBar.open(error.error, null, {
            duration: 3000
        });
    }
}
