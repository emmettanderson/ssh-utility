import { TestBed, inject } from '@angular/core/testing';

import { OutputDisplayService } from './output-display.service';

describe('OutputDisplayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutputDisplayService]
    });
  });

  it('should be created', inject([OutputDisplayService], (service: OutputDisplayService) => {
    expect(service).toBeTruthy();
  }));
});
