import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators/catchError';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {Observable} from "rxjs/Observable";

@Injectable()
export class UploadService {

    private apiUrl = 'api/images';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // This token is for a local test sqlite db... good luck ;)
            'Authorization': 'Token 5b9d9885b553c7f5f3a2caacd84467e8b1adefae'
        })
    };

    constructor(private httpClient: HttpClient) {
    }

    public postFile(fileToUpload: File): Observable<string> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.httpClient
            .post(this.apiUrl, formData, {
                headers: this.httpOptions, responseType: 'text'
            })
            .pipe(
                catchError(UploadService.handleError)
            );
    }

    public imageSourceFromId(id: string) {
        const url = "http://localhost:8000/media/" + id + ".png";
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
