const { TestBed } = require('@angular/core/testing');
const { FlightSearchComponent } = require('../app/components/flight-search/flight-search.component');

describe('FlightSearchComponent Validation', () => {
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightSearchComponent],
    });
    const fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
  });

  it('should display an error when origin field is empty', () => {
    component.origin = '';
    component.destination = 'JFK';
    component.date = '2024-12-01';

    component.searchFlights();

    expect(component.errorMessage).toBe('The origin field is mandatory');
  });
});
