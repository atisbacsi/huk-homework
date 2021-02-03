import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageServiceService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Window, useValue: window}
      ]
    });
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reflect if LocalStorage is supported', () => {
    expect(window.localStorage).toBeDefined();
  }); 

  it ('should set item', () => {
    service.set('testKey', 'testItem');
    expect(window.localStorage.getItem('testKey')).toBe('"testItem"');
  });

  it('should get item', () => {
    const item = {x: 'y'};
    window.localStorage.setItem('testItem', JSON.stringify(item));
    expect(service.get('testItem')).toEqual(item);
  });

  it('should remove item', () => {
    const item = {x: 'y'};

    service.set('testKey', item);
    expect(window.localStorage.getItem('testKey')).not.toBeNull();

    service.remove('testKey')
    expect(window.localStorage.getItem('testKey')).toBeNull();
  });
});

describe('LocalStorageServiceService', () => {
  let service: LocalStorageService;
  const windowSpy = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Window, useValue: windowSpy}
      ]
    });
    service = TestBed.inject(LocalStorageService);
    
  });

  it('should reflect if LocalStorage is supported', () => {
    expect(service.isLocalStorageSupported).toBeFalse();
  }); 
});
