import { Component, OnInit } from '@angular/core';
import { Post } from '../Post';
import { PostProviderService } from '../post-provider.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postList: Array<Post>;

  constructor(private provider: PostProviderService) {
  }

  ngOnInit() {
    this.provider.getPosts().subscribe(posts => this.postList = posts)
  }
}
