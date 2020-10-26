import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EmployerService } from 'src/app/services/employer.service';


@Component({
  selector: 'app-modal-work-benifit',
  templateUrl: './modal-work-benifit.component.html',
  styleUrls: ['./modal-work-benifit.component.css']
})
export class ModalWorkBenifitComponent implements OnInit {

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
    private dialogRef: MatDialogRef<ModalWorkBenifitComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private toastrService: ToastrService,
    private employerService: EmployerService
  ) { }

  ngOnInit(): void {
    this.contentEditor = this.data?.description
 }

 save() {
   this.data.description = this.contentEditor

   this.employerService.updateEmployer(this.data).subscribe(
     res => {
      this.dialogRef.close(true)
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
     }
   )
 }

 close() {
     this.dialogRef.close();
 }
}
