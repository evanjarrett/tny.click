import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginModel} from "./login.model";
import {Account} from "../models/account";
import {MatDialogRef} from "@angular/material";
import {ApiService} from "../services/api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loginModel = new LoginModel();
    hide: boolean = true;

    private errorMessage: string = "";

    constructor(
        private router: Router,
        private builder: FormBuilder,
        private service: ApiService,
        public dialogRef: MatDialogRef<LoginComponent>,
        private zone: NgZone
    ) {
        this.createForm();
    }

    ngOnInit() {
    }

    public onNoClick(): void {
        this.dialogRef.close();
    }

    public login(): void {
        this.loginModel = this.loginForm.value;
        this.service.login(this.loginModel)
            .subscribe(
                ret => this.onLoginComplete(ret),
                error => this.onLoginError(error)
            );
    }

    public onLoginComplete(ret: Account): void {
        this.zone.run(() => this.dialogRef.close());
        this.router.navigate(['']);
    }

    private onLoginError(error: any) {
        if ("non_field_errors" in error.error) {
            this.errorMessage = error.error.non_field_errors[0]
        }
    }

    getErrorMessage(): string {
        return this.errorMessage
    }

    getRequiredMessage(): string {
        return "This field is required";
    }

    private createForm() {
        this.loginForm = this.builder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
}
