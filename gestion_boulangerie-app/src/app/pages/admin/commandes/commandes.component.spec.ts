import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommandeComponent } from './commandes.component';

describe('CommandesComponent', () => {
  let component: AdminCommandeComponent;
  let fixture: ComponentFixture<AdminCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCommandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
