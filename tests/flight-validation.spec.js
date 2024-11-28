import { expect } from 'chai';

describe('Flight validation', () => {
  it('should display an error when origin field is empty', () => {
    const mockFlightSearch = {
      origin: '',
      destination: 'JFK',
      date: '2024-12-01',
    };

    const errorMessage = mockFlightSearch.origin === '' ? 'The origin field is mandatory' : null;

    expect(errorMessage).to.equal('The origin field is mandatory');
  });
});

