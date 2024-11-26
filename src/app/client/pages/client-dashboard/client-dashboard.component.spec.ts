import { ComponentFixture, TestBed } from '@angular/core/testing';
import { clientDashboardComponent } from './client-dashboard.component';



describe('clientDashboardComponent', () => {
  let component: clientDashboardComponent;
  let fixture: ComponentFixture<clientDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [clientDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(clientDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
