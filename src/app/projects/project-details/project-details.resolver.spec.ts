import { TestBed } from '@angular/core/testing';

import { ProjectDetailsResolver } from './project-details.resolver';

describe('ProjectDetailsResolver', () => {
  let resolver: ProjectDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProjectDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
