import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedInformationsService {
  private isLogged: boolean = false;
  private userId: string;
  private formationId: string;

  constructor() {}
  public setIsLogged(b: boolean) {
    this.isLogged = b;
  }
  public getIsLogged(): boolean {
    return this.isLogged;
  }
  public setUserId(userId: string) {
    this.userId = userId;
  }
  public getUserId(): string {
    return this.userId;
  }
  public setFormationId(formationId: string) {
    this.formationId = formationId;
  }
  public getFormationId(): string {
    return this.formationId;
  }
}
