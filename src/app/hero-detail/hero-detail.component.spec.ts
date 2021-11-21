import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { of } from "rxjs";

import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { FormsModule } from "@angular/forms";


describe('HeroDetailComponent', () => {
  let mockActivatedRoute;
  let mockHeroService;
  let mockLocation;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => { return '3'; }}}
    };
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['getHero', 'updateHero']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        {
          provide: ActivatedRoute, useValue: mockActivatedRoute
        },
        {
          provide: HeroService, useValue: mockHeroService
        },
        {
          provide: Location, useValue: mockLocation
        }
      ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strengtt: 100}));
  });

  it('should render the hero name in a h2 tag', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  });
});
