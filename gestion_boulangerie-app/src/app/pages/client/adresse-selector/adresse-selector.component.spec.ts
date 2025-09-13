import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseSelectorComponent } from './adresse-selector.component';

describe('AdresseSelectorComponent', () => {
  let component: AdresseSelectorComponent;
  let fixture: ComponentFixture<AdresseSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdresseSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdresseSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
