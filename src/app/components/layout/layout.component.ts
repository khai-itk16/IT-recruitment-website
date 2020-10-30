import { Component, OnInit } from '@angular/core';

declare const $: any

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function() {
      $(window).scroll(function() {
        if ($(window).scrollTop() < 20){
          $(".back-to-top").css("display", "none")
          $(".back-to-top").removeClass("fadeIn")
        } else {
          $(".back-to-top").css("display", "inline")
          $(".back-to-top").addClass("fadeIn")
        } 
      })

      $(".back-to-top").click(function (e) { 
        e.preventDefault();
        $("html,body").animate({
          scrollTop: 0
        }, 700);
      });
    })
  }

}
