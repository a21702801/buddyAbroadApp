import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { RestService } from '../../services/rest-service/rest.service';

@Component({
  selector: 'app-frogot-password',
  templateUrl: './frogot-password.page.html',
  styleUrls: ['./frogot-password.page.scss'],
})
export class FrogotPasswordPage implements OnInit {

  forgotPasswordForm: FormGroup;
  public emailMessage;
  public errorMessages = {
    email: [
      {type: 'maxlength', message: 'Maximum of 70 characters'},
      {type: 'pattern', message: 'Please insert a valid email'},
      {type: 'required', message: 'Your email is required'}
    ]
  };

  constructor(
      private formBuilder: FormBuilder,
      private httpClient: HttpClient,
      private restService: RestService,
      public toastController: ToastController
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.maxLength(70),
          Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
          Validators.required
        ]
      ]
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  async submit() {
    console.log(this.forgotPasswordForm.value);
    this.restService.postForm(this.forgotPasswordForm.value, this.restService.FORGOTPASSWORD_SERVER, '/requestEmail').subscribe(
        res => {
          console.log(res);
          this.emailMessage = res;
          console.log(res);
          this.presentToast(this.emailMessage.info, 'success');
        },
        error => {
          console.log(error);
          this.emailMessage = error.error;
          console.log(error);
          this.presentToast(this.emailMessage, 'danger');
        });
  }

  async presentToast( emailMessage, color ) {
    const toast = await this.toastController.create({
      message: emailMessage,
      duration: 2000,
      color
    });
    toast.present();
  }

}
