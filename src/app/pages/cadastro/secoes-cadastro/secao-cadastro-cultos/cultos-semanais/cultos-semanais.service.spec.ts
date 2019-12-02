import { TestBed } from '@angular/core/testing';

import { CultosSemanaisService } from './cultos-semanais.service';

describe('CultosSemanaisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CultosSemanaisService = TestBed.get(CultosSemanaisService);
    expect(service).toBeTruthy();
  });
});
