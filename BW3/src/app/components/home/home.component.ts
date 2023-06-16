
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  selectedPostId!: number
  @ViewChild('modal') modal!: ElementRef;

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
    });
  }

  openModal(id: number) {
    this.selectedPostId = id;
    const modalEl = this.modal.nativeElement;
    modalEl.classList.add('show');
    modalEl.style.display = 'block';
    const selectedPost:Post|undefined = this.posts.find(post => post.id === this.selectedPostId);
    if (selectedPost) {
      const titleInput = modalEl.querySelector('#editTitle') as HTMLInputElement;
      const bodyInput = modalEl.querySelector('#editBody') as HTMLTextAreaElement;
      titleInput.value = selectedPost.title;
      bodyInput.value = selectedPost.body;
    }
    console.log(id)
  }

  closeModal() {

    const modalEl = this.modal.nativeElement;
    modalEl.classList.remove('show');
    modalEl.style.display = 'none';
  }

  submitModal() {
    const modalEl = this.modal.nativeElement;
    const titleInput = modalEl.querySelector('#editTitle') as HTMLInputElement;
    const bodyInput = modalEl.querySelector('#editBody') as HTMLTextAreaElement;
    const title = titleInput.value;
    const body = bodyInput.value;
    if (this.selectedPostId && title && body) {
      const data = { title, body };
      this.postsSrv.modify(this.selectedPostId, data).subscribe(updatedPost => {

        const index = this.posts.findIndex(post => post.id === updatedPost.id);
        if (index !== -1) {
          this.posts[index] = updatedPost;
        }
        console.log('Post aggiornato:', updatedPost);
      });
    }
    this.closeModal();
  }


}
