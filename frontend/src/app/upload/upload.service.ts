import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators/catchError';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {Observable} from "rxjs/Observable";
import {Account} from "../models/account";

@Injectable()
export class UploadService {

    private apiUrl = 'api/images';
    private account : Account;

    constructor(private httpClient: HttpClient) {
    }

    public postFile(fileToUpload: File): Observable<string> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        this.account = JSON.parse(localStorage.getItem("account"));
        return this.httpClient
            .post(this.apiUrl, formData, {
                headers: new HttpHeaders({
                    'enctype': 'multipart/form-data',
                    // This token is for a local test sqlite db... good luck ;)
                    'Authorization': 'Token ' + this.account.token
                }),
                responseType: 'text'
            })
            .pipe(
                catchError(UploadService.handleError)
            );
    }

    public imageSourceFromId(id: string) {
        return "http://localhost:8000/media/" + id + ".png";
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
