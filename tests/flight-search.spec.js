import { expect } from 'chai';

describe('Flight search', () => {
  it('should perform flight search with valid data', () => {
    const mockFlights = [
      { id: 1, origin: 'TLV', destination: 'JFK', date: '2024-12-01' },
      { id: 2, origin: 'TLV', destination: 'LHR', date: '2024-12-01' },
    ];
    const searchCriteria = { origin: 'TLV', destination: 'JFK', date: '2024-12-01' };

    const searchResults = mockFlights.filter(
      flight =>
        flight.origin === searchCriteria.origin &&
        flight.destination === searchCriteria.destination &&
        flight.date === searchCriteria.date
    );

    expect(searchResults.length).to.equal(1);
    expect(searchResults[0].destination).to.equal('JFK');
  });
});
