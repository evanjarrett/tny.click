import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadEvent, UploadFile } from 'ngx-file-drop';


import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UploadComponent>,
    private uploadService: UploadService
  ) { }

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
            .subscribe(url => console.log(url));

        });
      }
    }
  }

  public fileOver(event) {
    console.log("fileOver:", event);
  }

  public fileLeave(event) {
    console.log("fileLeave:", event);
  }

}
