import {Component, OnInit} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {LoginService} from "../login.service";
import {HttpResponse} from "@angular/common/http";
import {take} from "rxjs";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    isLoggedIn: boolean = false;
    name = '';
    roles: string[] = [];

    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        public layoutService: LayoutService
    ) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    onSubmit(loginForm: FormGroup) {
        const loginData = this.loginForm.value;
        if (loginForm) {
            this.loginService
                .login(this.loginForm.value.username, this.loginForm.value.password)
                .pipe(take(1))
                .subscribe((response) => {
                    console.log('1')
                    localStorage.setItem(
                        'auth-token',
                        response.headers.get('auth-token') || ''
                    );

                    localStorage.setItem(
                        'principal',
                        this.loginForm.value.username
                    );

                    if (localStorage.getItem('auth-token') !== '') {
                        this.isLoggedIn = true;
                    }
                    window.location.reload();
                });
        }

    }
}
