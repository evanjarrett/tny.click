import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators/catchError';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {Observable} from "rxjs/Observable";
import {Account} from "../models/account";
import {Image} from "../models/image";

@Injectable()
export class UploadService {

    private account: Account;

    constructor(
        private httpClient: HttpClient
    ) {
        this.account = JSON.parse(localStorage.getItem("account"));
    }

    public postImage(fileToUpload: File): Observable<string> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.httpClient
            .post("api/images", formData, {
                headers: new HttpHeaders({
                    'enctype': 'multipart/form-data',
                    'Authorization': 'Token ' + this.account.token
                }),
                responseType: 'text'
            })
            .pipe(
                catchError(UploadService.handleError)
            );
    }

    public getImage(id: string): Observable<Image> {
        return this.httpClient
            .get("api/image/" + id, {
                headers: new HttpHeaders({
                    'Authorization': 'Token ' + this.account.token
                })
            })
            .pipe(
                catchError(UploadService.handleError)
            );
    }

    private static handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(
            'Something bad happened; please try again later.');
    };
}
