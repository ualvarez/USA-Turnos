import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from './members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members: Member[] = [];
  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
    })
  }

}
