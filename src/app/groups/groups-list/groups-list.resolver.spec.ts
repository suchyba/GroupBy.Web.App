import { TestBed } from '@angular/core/testing';

import { GroupsListResolver } from './groups-list.resolver';

describe('GroupsListResolver', () => {
  let resolver: GroupsListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GroupsListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
