import { TestBed } from '@angular/core/testing';

import { ProvokerService } from './provoker.service';

describe('ProvokerService', () => {
  let service: ProvokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
