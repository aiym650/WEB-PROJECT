import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { authGuard } from './auth.guard';

describe('authGuard (function)', () => {
  const executeGuard: CanActivateFn = (...params) =>
    TestBed.runInInjectionContext(() => authGuard(...params));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be defined', () => {
    expect(executeGuard).toBeDefined();
  });
});
