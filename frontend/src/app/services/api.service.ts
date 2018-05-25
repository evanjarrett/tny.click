import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject, Observable} from "rxjs";
import {Account} from "../models/account";
import {LoginModel} from "../login/login.model";
import {environment} from "../../environments/environment";
import {throwError} from "rxjs/internal/observable/throwError";
import {Image} from "../models/image";

@Injectable()
export class ApiService {

    public hasToken: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private account: Account;
    private apiUrl = environment.apiUrl;
    private tokenUrl = this.apiUrl + "/api/token";
    private imagesUrl = this.apiUrl + "/api/images";
    private imageUrl = this.apiUrl + "/api/image";

    constructor(
        private httpClient: HttpClient
    ) {
        this.account = JSON.parse(localStorage.getItem("account"));
    }

    public login(login: LoginModel): Observable<Account> {
        return this.httpClient
            .post<Account>(this.tokenUrl, login)
            .pipe(
                catchError(ApiService.handleError)
            );
    }

    public postImage(fileToUpload: File): Observable<string> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.httpClient
            .post(this.imagesUrl, formData, {
                headers: new HttpHeaders({
                    'Authorization': 'Token ' + this.account.token
                }),
                responseType: 'text'
            })
            .pipe(
                catchError(ApiService.handleError)
            );
    }

    public getImage(id: string): Observable<Image> {
        return this.httpClient
            .get<Image>(this.imageUrl + "/" + id, {
                headers: new HttpHeaders({
                    'Authorization': 'Token ' + this.account.token
                })
            })
            .pipe(
                catchError(ApiService.handleError)
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
                `status message: ${error.statusText}`);
        }
        // return an observable with a user-facing error message
        return throwError(error);
    };

}
