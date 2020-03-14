import { TestBed } from '@angular/core/testing';

import { AppVarsService } from './app-vars.service';

describe('AppVarsService', () => {
  let service: AppVarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppVarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
