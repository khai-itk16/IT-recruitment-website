import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-education',
  templateUrl: './modal-education.component.html',
  styleUrls: ['./modal-education.component.css']
})
export class ModalEducationComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalEducationComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close("asdfa")
  }

  close() {
    this.dialogRef.close()
  }

}
