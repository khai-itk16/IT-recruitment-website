import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-expect-job',
  templateUrl: './modal-expect-job.component.html',
  styleUrls: ['./modal-expect-job.component.css']
})
export class ModalExpectJobComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalExpectJobComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { }

  ngOnInit(): void {
    
  }

  save() {
    this.dialogRef.close("sssssss");
  }

  close() {
      this.dialogRef.close();
  }

}
