import { TestBed } from '@angular/core/testing';

import { ProcessoServiceService } from './processo-service.service';

describe('ProcessoServiceService', () => {
  let service: ProcessoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
