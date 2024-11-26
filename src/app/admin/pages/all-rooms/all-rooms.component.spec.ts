import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllRoomsComponent } from './all-rooms.component';


describe('AllroomsComponent', () => {
  let component: AllRoomsComponent;
  let fixture: ComponentFixture<AllRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
