import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Friend } from '../module/friend.interface';



@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  selectedFriendtId!:number

  friends!:Friend[]
  @ViewChild('modal') modal!: ElementRef;

  constructor(private postSrv:PostsService){}


  ngOnInit(){
    this.postSrv.getFriend().subscribe((friends)=>{
      this.friends = friends
      console.log(friends)
    })
  }
  openModal(id: number) {
    this.selectedFriendtId = id;
    const modalEl = this.modal.nativeElement;
    modalEl.classList.add('show');
    modalEl.style.display = 'block';
    const selectedFriend = this.friends.find(friend => friend.id === this.selectedFriendtId);
    if (selectedFriend) {
      let nameFriend = (modalEl.querySelector('.name-friend') as HTMLInputElement);
      let userNameFriend = (modalEl.querySelector('.username-friend') as HTMLTextAreaElement);
      let emailFriend = (modalEl.querySelector('.email-friend') as HTMLTextAreaElement)
      let phoneFriend = (modalEl.querySelector('.phone-friend') as HTMLTextAreaElement)
      let websiteFriend = (modalEl.querySelector('.website-friend') as HTMLTextAreaElement)
      nameFriend.innerText = selectedFriend.name
      userNameFriend.innerText = selectedFriend.username
      emailFriend.innerText = selectedFriend.email
      phoneFriend.innerText = selectedFriend.phone
      websiteFriend.innerText = selectedFriend.website

    }
  }
  closeModal() {

    const modalEl = this.modal.nativeElement;
    modalEl.classList.remove('show');
    modalEl.style.display = 'none';
  }
}
