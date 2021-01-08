import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Agence BAB';

  isDisabled = true;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.isDisabled = false;
  }

}
