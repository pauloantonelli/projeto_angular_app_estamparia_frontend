import { TestBed } from '@angular/core/testing';

import { StatusCarregamentoService } from './status-carregamento.service';

describe('StatusCarregamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusCarregamentoService = TestBed.get(StatusCarregamentoService);
    expect(service).toBeTruthy();
  });
});
