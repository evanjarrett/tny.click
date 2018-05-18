import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {LoginModel} from "./login.model";
import {TokenModel} from "./token.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class LoginService {

    public hasToken: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private apiUrl = 'api/token';


    constructor(private httpClient: HttpClient) {
    }

    public login(login: LoginModel): Observable<TokenModel> {
        return this.httpClient
            .post<TokenModel>(this.apiUrl, login)
    }

}
