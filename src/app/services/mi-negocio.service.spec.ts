import { TestBed } from '@angular/core/testing';

import { MiNegocioService } from './mi-negocio.service';

describe('MiNegocioService', () => {
  let service: MiNegocioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiNegocioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
