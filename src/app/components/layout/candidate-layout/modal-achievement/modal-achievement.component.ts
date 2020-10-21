import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { CandidateCvService } from 'src/app/services/candidate-cv.service';

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
    @Inject(MAT_DIALOG_DATA) private data,
    private toastrService: ToastrService,
    private candidateCvService: CandidateCvService
  ) { }

  ngOnInit(): void {
    this.contentEditor = this.data.achievement
  }

  save() {
    this.data.achievement = this.contentEditor
    console.log(this.data)
    this.candidateCvService.updateCandidateResume(this.data).subscribe(
      res => {
        console.log(res)
      },
      error => {
        console.log(error)
        this.toastrService.error("Có lỗi trong quá trình chỉnh sửa. Vui lòng kiểm tra lại", "ERROR", {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          tapToDismiss: false
        })
      },
      () => {
        this.dialogRef.close(true);
      }
    )
  }

  close() {
      this.dialogRef.close();
  }
}
