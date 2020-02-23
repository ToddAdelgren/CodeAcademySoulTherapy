import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsOfuseComponent } from './terms-ofuse.component';

describe('TermsOfuseComponent', () => {
  let component: TermsOfuseComponent;
  let fixture: ComponentFixture<TermsOfuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsOfuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsOfuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
