import { TestBed } from '@angular/core/testing';

import { AppVarsServiceService } from './app-vars-service.service';

describe('AppVarsServiceService', () => {
  let service: AppVarsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppVarsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
