import { TestBed } from '@angular/core/testing';

import { SharedModalService } from './shared-modal.service';

describe('SharedModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedModalService = TestBed.get(SharedModalService);
    expect(service).toBeTruthy();
  });
});
