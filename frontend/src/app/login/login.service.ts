import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {LoginModel} from "./login.model";
import {Account} from "../models/account";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class LoginService {

    public hasToken: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private apiUrl = 'http://localhost:8000/api/token';

    constructor(private httpClient: HttpClient) {
    }

    public login(login: LoginModel): Observable<Account> {
        return this.httpClient
            .post<Account>(this.apiUrl, login)
    }

}
