import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashMainComponent } from './splash-main.component';

describe('SplashMainComponent', () => {
  let component: SplashMainComponent;
  let fixture: ComponentFixture<SplashMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
