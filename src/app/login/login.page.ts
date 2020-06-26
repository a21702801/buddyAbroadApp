import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestService } from '../../services/rest-service/rest.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  public loginResponse;

    public errorMessages = {
        email: [
            {type: 'pattern', message: 'Please insert a valid email'},
        ],
        password: [
            {type: 'pattern', message: 'Please insert a valid password'},
        ],
    };

  constructor(
      private httpClient: HttpClient,
      private formBuilder: FormBuilder,
      private restService: RestService,
      private storage: Storage,
      private route: ActivatedRoute,
      private router: Router,
      public toastController: ToastController
  ) { }

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

    async presentToast( registerMessage, color ) {
        const toast = await this.toastController.create({
            message: registerMessage,
            duration: 2000,
            color
        });
        toast.present();
    }

    async submit() {
        console.log(this.loginForm.value);
        this.restService.postForm(this.loginForm.value, this.restService.AUTH_ADRESS, '/login').subscribe(
            async res => {
                this.loginResponse = res;
                const authTokens = { access_token: this.loginResponse.accessToken, refresh_token: this.loginResponse.refreshToken };
                await this.storage.set('email', this.loginResponse.email);
                await this.storage.set('auth_tokens', authTokens);
                await this.router.navigate(['/tabs'], { relativeTo: this.route});
                // await this.router.navigate(['/teste'], { relativeTo: this.route});
                // this.presentToast(this.loginMessage.info, 'success');
            },
            error => {
                console.log('Error');
                this.loginResponse = error.error;
                console.log(error);
                this.presentToast(this.loginResponse, 'danger');
            });
    }
}
