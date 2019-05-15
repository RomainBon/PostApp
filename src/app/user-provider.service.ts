import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserProviderService {

  users = new Array<User>();
  usersSubject= new ReplaySubject<User[]>(1);
  date : Date;

  constructor(private http: HttpClient) { 
    this.http.get<User[]>('./assets/user.json').subscribe(posts=>{
      this.users=posts;
      this.usersSubject.next(this.users);
    })
  }

  getUser(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

}
