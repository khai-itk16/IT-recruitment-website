import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelfInforComponent } from './modal-self-infor.component';

describe('ModalSelfInforComponent', () => {
  let component: ModalSelfInforComponent;
  let fixture: ComponentFixture<ModalSelfInforComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSelfInforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelfInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
