import { TestBed } from '@angular/core/testing';

import { DetectaPlataformaService } from './detecta-plataforma.service';

describe('DetectaPlataformaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetectaPlataformaService = TestBed.get(DetectaPlataformaService);
    expect(service).toBeTruthy();
  });
});
