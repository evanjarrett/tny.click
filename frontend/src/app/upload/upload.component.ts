import {Component, NgZone, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FileSystemFileEntry, UploadEvent} from 'ngx-file-drop';

import {UploadService} from './upload.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<UploadComponent>,
        private router: Router,
        private uploadService: UploadService,
        private zone: NgZone
    ) {
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    public dropped(event: UploadEvent) {
        for (const droppedFile of event.files) {

            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {

                    // Here you can access the real file
                    console.log(file.name, file);

                    this.uploadService.postFile(file)
                        .subscribe(url => this.imageURLReturned(url));
                });
            }
        }
    }

    private imageURLReturned(url: string) {
        const rout = url.split("/media/")[1].split(".")[0];
        this.zone.run(() => this.dialogRef.close());
        this.router.navigate(['/image', rout]);
    }

    public fileOver(event) {
        console.log("fileOver:", event);
    }

    public fileLeave(event) {
        console.log("fileLeave:", event);
    }

}
