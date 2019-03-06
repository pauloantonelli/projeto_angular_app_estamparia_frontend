import { TestBed } from '@angular/core/testing';

import { PortifolioClientesService } from './portifolio-clientes.service';

describe('PortifolioClientesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortifolioClientesService = TestBed.get(PortifolioClientesService);
    expect(service).toBeTruthy();
  });
});
