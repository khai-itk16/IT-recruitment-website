import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCvDetailComponent } from './view-cv-detail.component';

describe('ViewCvDetailComponent', () => {
  let component: ViewCvDetailComponent;
  let fixture: ComponentFixture<ViewCvDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCvDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCvDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
