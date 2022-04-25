import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Formation } from '../classes/formation';
import { User } from '../classes/user';
import { SharedInformationsService } from './shared-informations.service';
import { log } from 'console';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  userFormations: Array<string>;
  formationSet: Set<string>;
  formationArray: string[];
  data: any;
  constructor(
    private db: AngularFirestore,
    private angularFireAuth: AngularFireAuth
  ) {}

  public getFormations(): Observable<Formation[]> {
    return this.db.collection<Formation>('formations').valueChanges();
  }

  public getFormation(id: string): Observable<Formation> {
    return this.db.collection<Formation>('formations').doc(id).valueChanges();
  }

  //login
  public login(user: User) {
    return this.angularFireAuth.signInWithEmailAndPassword(
      user.login,
      user.password
    );
  }
  //sign up
  public signup(user: User) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(user.login, user.password)
      .then((cred) => {
        this.createUser(cred.user.uid, user);
      });
  }
  public createUser(id: string, user: User) {
    this.db.collection('users').doc(id).set({ userName: user.userName });
  }
  public getUser(id): Observable<User> {
    return this.db.collection<User>('users').doc(id).valueChanges();
  }
  async saveFormation(sharedInformations: SharedInformationsService) {
    await this.db
      .collection('users')
      .ref.doc(sharedInformations.getUserId())
      .get()
      .then((res) => {
        this.data = res.data();
      });
    this.formationSet = new Set(this.data.formation);
    console.log(this.formationSet);
    this.formationSet.add(sharedInformations.getFormationId());
    this.formationArray = new Array();
    this.formationSet.forEach((val) => {
      this.formationArray.push(val);
    });
    this.db.collection('users').doc(sharedInformations.getUserId()).update({
      formation: this.formationArray,
    });
  }
}
