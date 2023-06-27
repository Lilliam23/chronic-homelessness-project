import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private url: string = "http://localhost:8080/api/v1/";
  private agencies: string = "agency";
  private users: string = "users";
  public getAgenciesUrl() {
    return this.url + this.agencies;
  }
  public postAgencyUrl() {
    return this.url + this.agencies;
  }

  public postAgencyRequestUpdate() {
    return this.url + this.agencies + "/request-update";
  }

  public putAgencyUrl() {
    return this.url + this.agencies;
  }
  public getAgencyByNameUrl(name: string) {
    return this.url + this.agencies + "/name/" + encodeURI(name);
  }
  public getAgencyByIdUrl(id: string) {
    return this.url + this.agencies + "/id/" + encodeURI(id);
  }
  public deleteAgency(id: string) {
    return this.url + this.agencies + "/id/" + encodeURI(id);
  }

  //users//
  public getUsersById(id: string) {
    return this.url + this.users + "/id/" + encodeURI(id);
  }
  public deleteUser(id: string) {
    return this.url + this.users + "/id/" + encodeURI(id);
  }
  public getUserByNameUrl(username: string) {
    return this.url + this.users + "/username/" + encodeURI(username);
  }
  public postUsersUrl() {
    return this.url + this.users;
  }
  public putUsersUrl() {
    return this.url + this.users;
  }
  public getUsersUrl() {
    return this.url + this.users;
  }

}
