import { Component,  } from '@angular/core';
import { Post } from '../Post';
import { PostProviderService } from '../post-provider.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent{
  newPost = new Post();

  constructor(private provider : PostProviderService){}

  addPosts() {
    this.provider.add(this.newPost);
    this.newPost = new Post();
  }
}
