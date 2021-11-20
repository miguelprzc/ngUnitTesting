import { HeroesComponent } from "./heroes.component";
import { of } from 'rxjs'
import { fakeAsync } from "@angular/core/testing";

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      {id:1, name: 'SpiderDude', strengh: 8},
      {id:2, name: 'Wonderful Woman', strengh: 24},
      {id:3, name: 'SuperDude', strengh: 55},
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(component.heroes.length).toEqual(2);
      expect(component.heroes.includes(HEROES[2])).toBeFalsy();
      expect(component.heroes).not.toContain(HEROES[2]);
    });

    it('should call the deleteHero method from heroService', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalled();
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
      mockHeroService.deleteHero(HEROES[2]).subscribe( heroes => {
        expect(heroes).not.toContain(HEROES[2]);
      });
    });
  });
});
