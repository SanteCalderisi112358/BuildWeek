import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../module/post.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postsSrv: PostsService) { }

  ngOnInit() {
    this.postsSrv.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
      console.log(this.posts);
    });
  }

  addPost(form: NgForm) {
    this.postsSrv.addNewPost(form.value).subscribe((newPost: Post) => {
      this.posts.push(newPost);
      console.log(this.posts)
      form.resetForm();
    });
  }

  removePost(id: number) {
    this.postsSrv.remove(id).subscribe(() => {

      this.posts = this.posts.filter(post => post.id !== id);
      console.log(this.posts)
    });
  }
}
