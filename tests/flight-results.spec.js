const { TestBed } = require('@angular/core/testing');
const { FlightResultsComponent } = require('../app/components/flight-results/flight-results.component');

describe('FlightResultsComponent', () => {
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightResultsComponent],
    });
    const fixture = TestBed.createComponent(FlightResultsComponent);
    component = fixture.componentInstance;
  });

  it('should display flight results correctly', () => {
    const mockResults = [
      { id: 1, airline: 'El Al', price: 500, departure: '2024-12-01T10:00', arrival: '2024-12-01T14:00' },
    ];
    component.results = mockResults;

    expect(component.results[0].airline).toBe('El Al');
    expect(component.results[0].price).toBe(500);
  });
});
