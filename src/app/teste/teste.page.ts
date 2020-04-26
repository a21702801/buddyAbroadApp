import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.page.html',
  styleUrls: ['./teste.page.scss'],
})
export class TestePage implements OnInit {
  testeForm: FormGroup;

  public errorMessages = {
      first_name: [
          {type: 'required', message: 'O nome é required'},
          {type: 'minlength', message: 'Tem que ter mais de 2 chars'},
          {type: 'pattern', message: 'Email com formato desconhecido'}
      ],
      email: [
          {type: 'maxlength', message: 'Tem mais de 70 letras'},
          {type: 'pattern', message: 'Email com formato desconhecido'},
          {type: 'required', message: 'Email é required'}
      ],
      password: [
          {type: 'maxlength', message: 'Tem mais de 25 letras'},
          {type: 'minlength', message: 'Tem que ter mais de 8 chars'},
          {type: 'pattern', message: 'Email com formato desconhecido'},
          {type: 'required', message: 'Email é required'}
      ],
      confirm_password: [
          {type: 'required', message: 'confirmação é required'}
      ]
  };

  constructor(private fb: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit() {
    this.testeForm = this.fb.group({
        first_name: [
            '',
            [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern('/^[a-z ,.\'-]+$/i')]],
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
                Validators.maxLength(25),
                Validators.minLength(8),
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
                Validators.required
            ]
        ],
        confirm_passsword: ['', [Validators.required]]
    }, {validator: this.matchingPasswords('password', 'confirm_passsword')});
  }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): {[key: string]: any} => {
            const password = group.controls[passwordKey];
            const confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    }

  get first_name() {
      return this.testeForm.get('first_name');
  }

  get email() {
      return this.testeForm.get('email');
  }

  get password() {
      return this.testeForm.get('password');
  }

  get confirm_password() {
      return this.testeForm.get('confirm_passsword');
  }

  submit() {
      this.httpClient.get('http://localhost:8080/').subscribe((response) => {
          console.log(response.toString());
      });
  }

 /* ping() {
    this.httpClient.get('http://localhost:8080/').subscribe((response) => {
        console.log(response.toString());
    });
  }*/

}
