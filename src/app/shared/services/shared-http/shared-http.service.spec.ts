import { TestBed } from '@angular/core/testing';

import { SharedHttpService } from './shared-http.service';

describe('SharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedHttpService = TestBed.get(SharedHttpService);
    expect(service).toBeTruthy();
  });
});
