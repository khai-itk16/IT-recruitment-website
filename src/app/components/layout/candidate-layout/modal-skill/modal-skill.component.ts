import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-skill',
  templateUrl: './modal-skill.component.html',
  styleUrls: ['./modal-skill.component.css']
})
export class ModalSkillComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalSkillComponent>,
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
