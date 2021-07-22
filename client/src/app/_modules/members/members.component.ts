import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { MembersService } from './members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members$: Observable<Member[]>;
  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
   this.members$ = this.memberService.getMembers();
  }

 

}
