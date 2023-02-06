import { TestBed } from '@angular/core/testing';

import { APIAccessService } from './api-access.service';

describe('APIAccessService', () => {
  let service: APIAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
