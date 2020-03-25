import { TestBed } from '@angular/core/testing';

import { SharedColorService } from './shared-color.service';

describe('SharedColorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedColorService = TestBed.get(SharedColorService);
    expect(service).toBeTruthy();
  });
});
