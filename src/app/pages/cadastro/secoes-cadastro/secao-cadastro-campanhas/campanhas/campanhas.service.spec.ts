import { TestBed } from '@angular/core/testing';

import { CampanhasService } from './campanhas.service';

describe('CampanhasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampanhasService = TestBed.get(CampanhasService);
    expect(service).toBeTruthy();
  });
});
