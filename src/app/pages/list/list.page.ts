import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/service/database.service';
import { Formation } from 'src/app/classes/formation';
import { SharedInformationsService } from 'src/app/service/shared-informations.service';
@Component({
  selector: 'app-home',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
})
export class ListPage {
  formations: Observable<Formation[]>;
  x: Observable<Formation>;
  constructor(
    private db: DatabaseService,
    private router: Router,
    private sharedInformations: SharedInformationsService
  ) {}

  ngOnInit(): void {
    this.formations = this.db.getFormations();
  }

  showDetails(id: string) {
    this.sharedInformations.setFormationId(id);
    this.router.navigate(['/details']);
  }
}
