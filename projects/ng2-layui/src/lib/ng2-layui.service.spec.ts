import { TestBed } from '@angular/core/testing';

import { Ng2LayuiService } from './ng2-layui.service';

describe('Ng2LayuiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Ng2LayuiService = TestBed.get(Ng2LayuiService);
    expect(service).toBeTruthy();
  });
});
