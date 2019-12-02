import { TestBed } from '@angular/core/testing';

import { AtualizarCultoService } from './atualizar-culto.service';

describe('AtualizarCultoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtualizarCultoService = TestBed.get(AtualizarCultoService);
    expect(service).toBeTruthy();
  });
});
