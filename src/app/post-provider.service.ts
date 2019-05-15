import { Injectable } from '@angular/core';
import { Post } from './Post';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostProviderService {

  posts = new Array<Post>();
  postsSubject= new ReplaySubject<Post[]>(1);
  constructor(private http: HttpClient) { 
    this.http.get<Post[]>('./assets/posts.json').subscribe(posts=>{
      this.posts=posts;
      this.postsSubject.next(this.posts);
    })
  }

  getPosts(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  add(newPost:Post){
    //ajoute au debut du tableau
    this.posts.unshift(newPost);
    //notifie tous abooné avec la nouvelle version de la liste
    this.postsSubject.next(this.posts);
  }
}
