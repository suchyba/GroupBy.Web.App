import { TestBed } from '@angular/core/testing';

import { ChildGroupsResolver } from './child-groups.resolver';

describe('ChildGroupsResolver', () => {
  let resolver: ChildGroupsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ChildGroupsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
