import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { OutputComponent } from './output.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('OutputComponent', () => {
  let component: OutputComponent;
  let fixture: ComponentFixture<OutputComponent>;
  let router: Router;

  beforeEach(async () => {
    const mockActivatedRoute = {
      params: of({ value: '10,000,000' }),
    };

    await TestBed.configureTestingModule({
      declarations: [OutputComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get route parameter on init', () => {
    expect(component.fullNumber).toBe('10,000,000');
  });

  it('should navigate to input route on redirectToInput call', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.redirectToInput();
    expect(navigateSpy).toHaveBeenCalledWith(['/input']);
  });
});
