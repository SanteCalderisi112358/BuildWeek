import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../module/post.interface';
import { Friend } from '../module/friend.interface';
import { Comment } from '../module/comment.interface';
@Injectable({
  providedIn: 'root'
})
export class PostsService {


  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get<Post[]>("https://jsonplaceholder.typicode.com/posts")
  }

  addNewPost(data:Post){
    return this.http.post<Post>("https://jsonplaceholder.typicode.com/posts", data)
  }

  remove(id:number){
    return this.http.delete<Post>("https://jsonplaceholder.typicode.com/posts/"+id)
  }

  modify(id:number, data:{title: string, body:string}){
    return this.http.put<Post>("https://jsonplaceholder.typicode.com/posts/"+id, data)
  }

  getFriend(){
    return this.http.get<Friend[]>("https://jsonplaceholder.typicode.com/users")
  }

  getCommentsByPostId(id:number){
    return this.http.get<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
  }

}
