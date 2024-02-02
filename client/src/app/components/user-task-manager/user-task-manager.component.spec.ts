import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskManagerComponent } from './user-task-manager.component';

describe('UserTaskManagerComponent', () => {
  let component: UserTaskManagerComponent;
  let fixture: ComponentFixture<UserTaskManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTaskManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTaskManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
