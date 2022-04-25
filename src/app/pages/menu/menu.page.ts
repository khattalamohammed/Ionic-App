import { Component, OnInit } from '@angular/core';
import { SharedInformationsService } from 'src/app/service/shared-informations.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  isLogged: boolean;
  constructor(private sharedInformations: SharedInformationsService) {}

  ngOnInit() {
    setInterval(() => {
      this.isLogged = this.sharedInformations.getIsLogged();
    }, 1000);
  }
}
