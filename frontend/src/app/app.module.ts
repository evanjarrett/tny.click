import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FileDropModule } from 'ngx-file-drop';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatToolbarModule,
  MatSidenavModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from './upload/upload.service';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent
    ToolbarComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FileDropModule
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
  providers: [UploadService],
  bootstrap: [AppComponent],
  entryComponents: [UploadComponent]
})
export class AppModule { }
