import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-experience',
  templateUrl: './modal-experience.component.html',
  styleUrls: ['./modal-experience.component.css']
})
export class ModalExperienceComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalExperienceComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { }

  ngOnInit(): void {
    
  }

  save() {
    this.dialogRef.close("sssssssss");
  }

  close() {
      this.dialogRef.close();
  }

}
