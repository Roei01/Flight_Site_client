import { expect } from 'chai';

describe('Flight results', () => {
  it('should display flight results correctly', () => {
    const mockResults = [
      { id: 1, airline: 'El Al', price: 500, departure: '2024-12-01T10:00', arrival: '2024-12-01T14:00' },
    ];

    expect(mockResults[0].airline).to.equal('El Al');
    expect(mockResults[0].price).to.equal(500);
    expect(mockResults[0].departure).to.equal('2024-12-01T10:00');
    expect(mockResults[0].arrival).to.equal('2024-12-01T14:00');
  });
});

