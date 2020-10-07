import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DetailRecruitmentComponent } from '../../detail-recruitment/detail-recruitment.component';
import { ModalAchievementComponent } from '../modal-achievement/modal-achievement.component';
import { ModalEducationComponent } from '../modal-education/modal-education.component';
import { ModalExpectJobComponent } from '../modal-expect-job/modal-expect-job.component';
import { ModalExperienceComponent } from '../modal-experience/modal-experience.component';
import { ModalGoalComponent } from '../modal-goal/modal-goal.component';
import { ModalReferencesComponent } from '../modal-references/modal-references.component';
import { ModalSelfInforComponent } from '../modal-self-infor/modal-self-infor.component';
import { ModalSkillComponent } from '../modal-skill/modal-skill.component';

declare const $: any

@Component({
  selector: 'app-candidate-make-cv',
  templateUrl: './candidate-make-cv.component.html',
  styleUrls: ['./candidate-make-cv.component.css']
})
export class CandidateMakeCVComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initAction()
  }

  initAction() {
   $(document).ready(function() {
     $(window).scroll(function() {
       if($(window).scrollTop() > 100) {
         $(".elementscroll").addClass("elementscroll-fixed")
       } else {
        $(".elementscroll").removeClass("elementscroll-fixed")
       }

       if($(window).scrollTop() >= $("#self-info-section").offset().top){
        $(".tabmenulinks .tabmenulink-active").removeClass("tabmenulink-active").children().removeClass("link-active")
        $("#link-self-info-section").addClass("tabmenulink-active").children().addClass("link-active")
       }

       if($(window).scrollTop() >= $("#target-job-section").offset().top){
        $(".tabmenulinks .tabmenulink-active").removeClass("tabmenulink-active").children().removeClass("link-active")
        $("#link-target-job-section").addClass("tabmenulink-active").children().addClass("link-active")
       }

       if($(window).scrollTop() >= $("#job-infor-section").offset().top){
        $(".tabmenulinks .tabmenulink-active").removeClass("tabmenulink-active").children().removeClass("link-active")
        $("#link-job-infor-section").addClass("tabmenulink-active").children().addClass("link-active")
       }

       if($(window).scrollTop() >= $("#experience-section").offset().top){
        $(".tabmenulinks .tabmenulink-active").removeClass("tabmenulink-active").children().removeClass("link-active")
        $("#link-experience-section").addClass("tabmenulink-active").children().addClass("link-active")
       }

       if($(window).scrollTop() >= $("#education-section").offset().top){
        $(".tabmenulinks .tabmenulink-active").removeClass("tabmenulink-active").children().removeClass("link-active")
        $("#link-education-section").addClass("tabmenulink-active").children().addClass("link-active")
       }

       if($(window).scrollTop() >= $("#skill-section").offset().top){
        $(".tabmenulinks .tabmenulink-active").removeClass("tabmenulink-active").children().removeClass("link-active")
        $("#link-skill-section").addClass("tabmenulink-active").children().addClass("link-active")
       }

       if($(window).scrollTop() >= $("#achievement-section").offset().top){
        $(".tabmenulinks .tabmenulink-active").removeClass("tabmenulink-active").children().removeClass("link-active")
        $("#link-achievement-section").addClass("tabmenulink-active").children().addClass("link-active")
       }

       if($(window).scrollTop() >= $("#references-section").offset().top){
        $(".tabmenulinks .tabmenulink-active").removeClass("tabmenulink-active").children().removeClass("link-active")
        $("#link-references-section").addClass("tabmenulink-active").children().addClass("link-active")
       }
     })
   })
  }

  openDialog(component, width, height, data) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    if(data !== null || data !== "undefined")
      dialogConfig.data = data
    dialogConfig.height = height
    dialogConfig.width = width
    return this.dialog.open(component, dialogConfig)
  }

  getSelfInfor() {
    this.openDialog(ModalSelfInforComponent, "800px", "540px", {})
  }

  getTarget() {
    let dataCurrent = $(".job-target .content-job-target").html()
    const dialogRef = this.openDialog(ModalGoalComponent, "800px", "500px", dataCurrent)
    dialogRef.afterClosed().subscribe(data => {
      $(".job-target .content-job-target").html(data)
    })
  }

  getExpectJob() {
    const dialogRef = this.openDialog(ModalExpectJobComponent, "800px", "500px", {})
    // dialogRef.afterClosed().subscribe(data => {
    //   console.log(data)
    // })
  }

  getExperience() {
    this.openDialog(ModalExperienceComponent, "800px", "450px", {})
  }

  getEducation() {
    this.openDialog(ModalEducationComponent, "800px", "450px", {})
  }

  getSkill() {
    this.openDialog(ModalSkillComponent, "800px", "450px", {})
  }

  getAchievement() {
    let dataCurrent = $(".job-achievement .content-job-achievement").html()
    const dialogRef = this.openDialog(ModalAchievementComponent, "800px", "500px", dataCurrent)
    dialogRef.afterClosed().subscribe(data => {
      $(".job-achievement .content-job-achievement").html(data)
    })
  }

  getReferences() {
    this.openDialog(ModalReferencesComponent, "800px", "400px", {})
  }

}
