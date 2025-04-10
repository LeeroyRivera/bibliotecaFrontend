import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansFormComponent } from './loans-form.component';

describe('LoansFormComponent', () => {
  let component: LoansFormComponent;
  let fixture: ComponentFixture<LoansFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoansFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoansFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
