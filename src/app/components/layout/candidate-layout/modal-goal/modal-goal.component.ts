import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-modal-goal',
  templateUrl: './modal-goal.component.html',
  styleUrls: ['./modal-goal.component.css']
})
export class ModalGoalComponent implements OnInit {

  editor = ClassicEditor
  contentEditor = ""
  editorConfig = {
    toolbar: {
      items: [
        'bold',
        'italic',
        'underline',
        'bulletedList',
        'numberedList',
        '|',
        'undo',
        'redo',
      ]
    }
  };  

  constructor(
    private dialogRef: MatDialogRef<ModalGoalComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
  ) { }

  ngOnInit(): void {
    this.contentEditor = this.data
  }

  save() {
    this.dialogRef.close(this.contentEditor);
  }

  close() {
      this.dialogRef.close();
  }

}
