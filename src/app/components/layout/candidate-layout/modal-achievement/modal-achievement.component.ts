import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-modal-achievement',
  templateUrl: './modal-achievement.component.html',
  styleUrls: ['./modal-achievement.component.css']
})
export class ModalAchievementComponent implements OnInit {

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
    private dialogRef: MatDialogRef<ModalAchievementComponent>,
    @Inject(MAT_DIALOG_DATA) private data
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
