import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes, ParamMap} from '@angular/router';
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

import {FileDropModule} from 'ngx-file-drop';

import {AppComponent} from './app.component';
import {ContentComponent} from './content/content.component';
import {UploadComponent} from './upload/upload.component';
import {UploadService} from './upload/upload.service';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {ImagedetailComponent} from './imagedetail/imagedetail.component';

const appRoutes: Routes = [
    {path: 'image/:id', component: ImagedetailComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        ContentComponent,
        ToolbarComponent,
        UploadComponent,
        ImagedetailComponent,
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            // {enableTracing: true} // <-- debugging purposes only
        ),
        BrowserModule,
        BrowserAnimationsModule,
        FileDropModule,
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
    exports: [
        RouterModule
    ],
    providers: [UploadService],
    bootstrap: [AppComponent],
    entryComponents: [UploadComponent]
})
export class AppModule {
}
