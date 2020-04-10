import { TestBed } from '@angular/core/testing';

import { LembretesService } from './lembretes.service';

describe('LembretesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LembretesService = TestBed.get(LembretesService);
    expect(service).toBeTruthy();
  });
});
