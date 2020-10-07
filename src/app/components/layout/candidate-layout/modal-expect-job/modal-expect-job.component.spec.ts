import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExpectJobComponent } from './modal-expect-job.component';

describe('ModalExpectJobComponent', () => {
  let component: ModalExpectJobComponent;
  let fixture: ComponentFixture<ModalExpectJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalExpectJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExpectJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
