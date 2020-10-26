import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWorkBenifitComponent } from './modal-work-benifit.component';

describe('ModalWorkBenifitComponent', () => {
  let component: ModalWorkBenifitComponent;
  let fixture: ComponentFixture<ModalWorkBenifitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalWorkBenifitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWorkBenifitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
