import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { SharedInformationsService } from 'src/app/service/shared-informations.service';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/service/database.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  email: string;
  pass: string;
  user: User;
  constructor(
    private db: DatabaseService,
    private router: Router,
    private alertController: AlertController,
    private sharedInformations: SharedInformationsService
  ) {}

  ngOnInit() {}
  login() {
    this.user = new User();
    this.user.login = this.email;
    this.user.password = this.pass;
    this.db.login(this.user).then((res) => {
      this.sharedInformations.setIsLogged(true);
      this.sharedInformations.setUserId(res.user.uid);
      this.db.saveFormation(this.sharedInformations);
      this.router.navigate(['']);
      this.showAlert();
    });
  }
  signup() {
    this.router.navigate(['signup']);
  }
  async showAlert() {
    await this.alertController
      .create({
        header: 'Félicitations',
        subHeader: 'vous êtes inscrit à la formation',
        message:
          'veuillez consulter votre dashboard pour listez toutes vos formations',
      })
      .then((res) => res.present());
  }
}
