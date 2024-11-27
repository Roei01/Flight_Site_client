const { TestBed } = require('@angular/core/testing');
const { FlightFilterComponent } = require('../app/components/flight-filter/flight-filter.component');

describe('FlightFilterComponent', () => {
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightFilterComponent],
    });
    const fixture = TestBed.createComponent(FlightFilterComponent);
    component = fixture.componentInstance;
  });

  it('should filter flight results by price', () => {
    // תוצאות דמה
    const mockResults = [
      { id: 1, airline: 'El Al', price: 500 },
      { id: 2, airline: 'Delta', price: 300 },
    ];
    component.results = mockResults;
    component.maxPrice = 400;

    component.filterResults();

    expect(component.filteredResults.length).toBe(1);
    expect(component.filteredResults[0].airline).toBe('Delta');
  });
});
