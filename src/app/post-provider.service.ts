import { Injectable } from '@angular/core';
import { Post } from './Post';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { UserProviderService } from './user-provider.service';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class PostProviderService {

  posts = new Array<Post>();
  postsSubject= new ReplaySubject<Post[]>(1);
  date : Date;
  userList: Array<User>;

  constructor(private http: HttpClient,
    private UserProvider : UserProviderService) { 
    this.http.get<Post[]>('./assets/posts.json').subscribe(posts=>{
      this.posts=posts;
      this.postsSubject.next(this.posts);
      this.UserProvider.getUser().subscribe(users => this.userList = users);
    })
  }

  getPosts(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  add(newPost:Post){
    this.date= new Date;
    this.userList.forEach(user => {
      if(newPost.user===user.name)
      {
       newPost.img= user.imgSrc;
      }
    });
    newPost.date = this.date.getDate().toLocaleString()+"/" +( this.date.getMonth() + 1 ) + "/" + this.date.getFullYear().toString();
    //ajoute au debut du tableau
    this.posts.push(newPost);
    //notifie tous abooné avec la nouvelle version de la liste
    this.postsSubject.next(this.posts);
  }
}
