import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { DatabaseService } from 'src/app/service/database.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  name: string;
  login: string;
  pass: string;
  passCon: string;
  user: User;
  constructor(
    private db: DatabaseService,
    private router: Router,
    public toastController: ToastController
  ) {}

  ngOnInit() {}
  signup() {
    this.user = new User();
    this.user.login = this.login;
    this.user.password = this.pass;
    this.user.userName = this.name;
    if (this.pass === this.passCon) {
      this.db.signup(this.user).then(() => {
        this.router.navigate(['/signin']);
        this.presentToast();
      });
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'vous avez créé un compte',
      duration: 2000,
    });
    toast.present();
  }
}
