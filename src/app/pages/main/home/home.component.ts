import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth.service';

interface Flight {
  flightNumber: string;
  origin: string;
  destination: string;
  date: string;
  price: number;
  bookingLink: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  origin: string = '';
  destination: string = '';
  date: string = '';
  flightResults: Flight[] = [];
  private apiUrl = 'http://localhost:3000'; // Backend API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadAllFlights(); // Load all flights on initialization
  }

  // Load all available flights
  loadAllFlights(): void {
    this.http.get<Flight[]>(`${this.apiUrl}/flights`).subscribe(
      (results) => {
        this.flightResults = results;
      },
      (error) => {
        console.error('Error loading all flights:', error);
        alert('Failed to load flights. Please try again later.');
      }
    );
  }

  // Search for flights based on input parameters
  searchFlights(): void {
    const searchParams = {
      origin: this.origin.trim(),
      destination: this.destination.trim(),
      date: this.date,
    };

    if (!searchParams.origin || !searchParams.destination || !searchParams.date) {
      alert('Please fill in all search fields.');
      return;
    }

    this.http.get<Flight[]>(`${this.apiUrl}/flights`, { params: searchParams }).subscribe(
      (results) => {
        this.flightResults = results;
      },
      (error) => {
        console.error('Error searching flights:', error);
        alert('Failed to search flights. Please try again.');
      }
    );
  }

  // Book a flight
  bookFlight(flight: Flight): void {
    console.log('Booking flight:', flight.flightNumber); // Log for debugging
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.getToken()}`
    );

    this.http.post<{ message: string; bookingLink: string }>(
      `${this.apiUrl}/bookings`,
      { flightNumber: flight.flightNumber }, // Ensure correct flightNumber
      { headers }
    ).subscribe(
      (response) => {
        alert(response.message); // Show confirmation message
        window.open(response.bookingLink, '_blank'); // Open booking link in a new tab
      },
      (error) => {
        console.error('Error booking flight:', error);
        alert('Failed to book the flight. Please try again later.');
      }
    );
  }
}
