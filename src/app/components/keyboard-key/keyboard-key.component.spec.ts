import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardKeyComponent } from './keyboard-key.component';

describe('KeyboardKeyComponent', () => {
  let component: KeyboardKeyComponent;
  let fixture: ComponentFixture<KeyboardKeyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyboardKeyComponent]
    });
    fixture = TestBed.createComponent(KeyboardKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
