import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConfirmPassword } from './confirm-password/confirm-password';
import { MinimumAge } from './minimum-age/minimumAge';
import { RestService } from '../../services/rest-service/rest.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

    registerForm: FormGroup;
    public registerMessage;

    public errorMessages = {
        first_name: [
            {type: 'required', message: 'Your first name is required'},
            {type: 'minlength', message: 'Minumum of 2 characters'},
            {type: 'pattern', message: 'Please only use letters'}
        ],
        last_name: [
            {type: 'required', message: 'Your first name is required'},
            {type: 'minlength', message: 'Minumum of 2 characters'},
            {type: 'pattern', message: 'Please only use letters'}
        ],
        gender: [
            {type: 'required', message: 'Please insert your gender'},
        ],
        date_of_birth: [
            {type: 'required', message: 'Please insert your gender'},
        ],
        email: [
            {type: 'maxlength', message: 'Maximum of 70 characters'},
            {type: 'pattern', message: 'Please insert a valid email'},
            {type: 'required', message: 'Your email is required'}
        ],
        password: [
            {type: 'minlength', message: 'Minimum 8 characters'},
            {type: 'pattern', message: 'At least 1 letter 1 Uppercase and 1 number'},
            {type: 'required', message: 'Password Required'}
        ],
        confirm_password: [
            {type: 'required', message: 'Please confirm your password'},
        ]
    };

    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private restService: RestService,
        public toastController: ToastController,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            first_name: [
                '',
                [
                Validators.required, Validators.minLength(2),
                Validators.pattern('^[a-zA-Z]+(?:[-\'][a-zA-Z]+)*$')]
            ],
            last_name: [
                '',
                [
                    Validators.required, Validators.minLength(2),
                    Validators.pattern('^[a-zA-Z]+(?:[-\'][a-zA-Z]+)*$')]
            ],
            gender: [
                '',
                [
                    Validators.required
                ]
            ],
            date_of_birth: [
                '',
                [
                    Validators.required,
                    MinimumAge(18)
                ]
            ],
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
            confirm_password: [
                '',
                [
                    Validators.required
                ]
            ]
        }, {validator: ConfirmPassword}) ;
    }

    get first_name() {
        return this.registerForm.get('first_name');
    }

    get last_name() {
        return this.registerForm.get('first_name');
    }

    get email() {
        return this.registerForm.get('email');
    }

    get password() {
        return this.registerForm.get('password');
    }

    get confirm_password() {
        return this.registerForm.get('confirm_password');
    }

    get date_of_birth() {
        return this.registerForm.get('date_of_birth');
    }

    async submit() {
        console.log(this.registerForm.value);
        this.restService.postForm(this.registerForm.value, this.restService.AUTH_ADRESS, '/register').subscribe(
                res => {
                    this.registerMessage = res;
                    console.log(res);
                    this.presentToast(this.registerMessage.info, 'success');
                    this.router.navigate(['success-page'], { relativeTo: this.route});
                },
                error => {
                    this.registerMessage = error.error;
                    console.log(error);
                    this.presentToast(this.registerMessage, 'danger');
                });
    }

    async presentToast( registerMessage, color ) {
        const toast = await this.toastController.create({
            message: registerMessage,
            duration: 2000,
            color
        });
        toast.present();
    }
}
