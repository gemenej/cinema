import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IqCardComponent } from './iq-card.component';

describe('IqCardComponent', () => {
  let component: IqCardComponent;
  let fixture: ComponentFixture<IqCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IqCardComponent]
    });
    fixture = TestBed.createComponent(IqCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
