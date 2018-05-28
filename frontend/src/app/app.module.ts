import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
} from '@angular/material';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {FileDropModule} from "ngx-file-drop";

import {AppComponent} from './app.component';
import {ContentComponent} from './content/content.component';
import {UploadComponent} from './upload/upload.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {ImagedetailComponent} from './imagedetail/imagedetail.component';
import {LoginComponent} from './login/login.component';
import {LoginButtonComponent} from './login-button/login-button.component';
import {ApiService} from "./services/api.service";

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
        LoginComponent,
        LoginButtonComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DropzoneModule,
        FileDropModule,
        FlexLayoutModule,
        FormsModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: 'csrftoken',
            headerName: 'X-CSRFToken'
        }),
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatToolbarModule,
        ReactiveFormsModule,
        RouterModule.forRoot(
            appRoutes,
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [ApiService],
    bootstrap: [AppComponent],
    entryComponents: [UploadComponent, LoginComponent]
})
export class AppModule {
}
