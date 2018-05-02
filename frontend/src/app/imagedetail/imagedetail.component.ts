import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UploadService} from "../upload/upload.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-imagedetail',
    templateUrl: './imagedetail.component.html',
    styleUrls: ['./imagedetail.component.css']
})
export class ImagedetailComponent implements OnInit {
    private image$: Observable<string>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: UploadService
    ) {
    }

    ngOnInit() {
        this.image$ = this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.service.imageSourceFromId(params.get('id')));
    }



}
