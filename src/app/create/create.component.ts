import { Component,  } from '@angular/core';
import { Post } from '../Post';
import { PostProviderService } from '../post-provider.service';
import { UserProviderService } from '../user-provider.service';
import { User } from '../User';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent{
  newPost = new Post();
  userList: Array<User>;

  constructor(private postProvider : PostProviderService,
    private UserProvider: UserProviderService){}
    ngOnInit() {
      this.UserProvider.getUser().subscribe(users => this.userList = users)
    }

  addPosts() {
    this.postProvider.add(this.newPost);
    this.newPost = new Post();
  }
}
