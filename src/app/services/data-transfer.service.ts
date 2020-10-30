import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private previewdata = new BehaviorSubject(null);

  constructor() { }

  setpreviewdata(data){
    this.previewdata.next(data);
  }

  getpreviewMessage(): Observable<any> {
      return this.previewdata.asObservable();
  }
}
