import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  form: FormGroup;
  description:string;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<ModalLoginComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
  }

  ngOnInit() {
      this.form = this.fb.group({
          email: ['', [Validators.email, Validators.required]],
          password: ['', []]
      });
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }

}
