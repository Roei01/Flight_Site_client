import { expect } from 'chai';

describe('Flight filter', () => {
  it('should filter flight results by price', () => {
    const mockResults = [
      { id: 1, airline: 'El Al', price: 500 },
      { id: 2, airline: 'Delta', price: 300 },
    ];
    const maxPrice = 400;

    const filteredResults = mockResults.filter(flight => flight.price <= maxPrice);

    expect(filteredResults.length).to.equal(1);
    expect(filteredResults[0].airline).to.equal('Delta');
  });
});

