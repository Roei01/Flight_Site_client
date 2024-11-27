const { TestBed } = require('@angular/core/testing');
const { FlightSearchComponent } = require('../app/components/flight-search/flight-search.component');

describe('FlightSearchComponent', () => {
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightSearchComponent],
    });
    const fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
  });

  it('should perform flight search with valid data', () => {
    component.origin = 'TLV';
    component.destination = 'JFK';
    component.date = '2024-12-01';

    component.searchFlights();

    expect(component.results.length).toBeGreaterThan(0);
  });
});
