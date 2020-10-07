import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-references',
  templateUrl: './modal-references.component.html',
  styleUrls: ['./modal-references.component.css']
})
export class ModalReferencesComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalReferencesComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
  ) { }

  ngOnInit(): void {

  }

  save() {
    this.dialogRef.close();
  }

  close() {
      this.dialogRef.close();
  }
 
}
