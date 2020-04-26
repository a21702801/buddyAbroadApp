import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ConfirmPassword} from '../register/confirm-password/confirm-password';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

    public errorMessages = {
        email: [
            {type: 'pattern', message: 'Please insert a valid email'},
        ],
        password: [
            {type: 'pattern', message: 'Please insert a valid password'},
        ],
    };

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: [
                '',
                [
                    Validators.maxLength(70),
                    Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
                    Validators.required
                ]
            ],
            password: [
                '',
                [
                    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
                    Validators.required
                ]
            ]
        });
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

}
