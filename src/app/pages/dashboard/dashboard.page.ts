import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Formation } from 'src/app/classes/formation';
import { DatabaseService } from 'src/app/service/database.service';
import { SharedInformationsService } from 'src/app/service/shared-informations.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  myFormations: Formation[];
  formationIds: string[];
  form: Formation;
  userName: string;
  constructor(
    private sharedInformations: SharedInformationsService,
    private db: DatabaseService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.db.getUser(this.sharedInformations.getUserId()).subscribe({
      next: (res) => {
        console.log(res);
        this.userName = res.userName;
        this.myFormations = new Array<Formation>();
        res.formation.forEach((element) => {
          this.db.getFormation(element).subscribe({
            next: (formation) => {
              this.myFormations.push(formation);
            },
          });
        });
      },
    });
  }
}
