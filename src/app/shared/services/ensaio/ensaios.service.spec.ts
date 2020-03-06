import { TestBed } from '@angular/core/testing';

import { EnsaiosService } from './ensaios.service';

describe('EnsaiosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnsaiosService = TestBed.get(EnsaiosService);
    expect(service).toBeTruthy();
  });
});
