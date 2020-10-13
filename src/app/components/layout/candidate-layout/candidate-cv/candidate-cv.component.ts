import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-candidate-cv',
  templateUrl: './candidate-cv.component.html',
  styleUrls: ['./candidate-cv.component.css']
})
export class CandidateCvComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public downloadAsPDF() {
    var element = document.getElementById('cvo-document');
    var opt = {
      margin: 8,
      filename: 'myfile.pdf',
      image: { type: 'jpg', quality: 0.98 },
      html2canvas: { scale: 3, y: 0,  scrollY: 0},
      jsPDF: { format: 'A4' },
    };
    html2pdf().from(element).set(opt).save();
  }
}
