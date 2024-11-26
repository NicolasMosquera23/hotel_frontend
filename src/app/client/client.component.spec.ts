import { ComponentFixture, TestBed } from '@angular/core/testing';

import { clientComponent } from './client.component';

describe('clientComponent', () => {
  let component: clientComponent;
  let fixture: ComponentFixture<clientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [clientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(clientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
