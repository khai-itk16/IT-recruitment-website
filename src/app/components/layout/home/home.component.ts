import { Component, OnInit } from '@angular/core';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public decodeJwtService: DecodeJwtService,
  ) { }

  ngOnInit(): void {
  }
}
