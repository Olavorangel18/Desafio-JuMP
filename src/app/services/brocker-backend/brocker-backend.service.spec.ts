import { TestBed } from '@angular/core/testing';

import {BrokerBackendService} from './brocker-backend.service'

describe('BrockerBackendService', () => {
  let service: BrokerBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrokerBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
