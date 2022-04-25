import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/service/database.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { SharedInformationsService } from 'src/app/service/shared-informations.service';
import { Formation } from 'src/app/classes/formation';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  formationObservable: Observable<Formation>;
  formation: Formation = new Formation();
  constructor(
    private databaseService: DatabaseService,
    private db: AngularFirestore,
    private router: Router,
    private sharedInformations: SharedInformationsService,
    private alert: AlertController
  ) {
    this.formationObservable = this.databaseService.getFormation(
      this.sharedInformations.getFormationId()
    );
    this.formationObservable.subscribe({
      next: (res) => {
        this.formation = res;
      },
    });
  }

  ngOnInit() {}
  public login(): void {
    if (!this.sharedInformations.getIsLogged()) {
      this.router.navigate(['/signin']);
    } else {
      this.databaseService.saveFormation(this.sharedInformations);
      this.showAlert();
      this.router.navigate(['']);
    }
  }
  async showAlert() {
    await this.alert
      .create({
        header: 'Félicitations',
        subHeader: 'vous êtes inscrit à la formation',
        message:
          'veuillez consulter votre dashboard pour listez toutes vos formations',
      })
      .then((res) => res.present());
  }
}
