import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth.service';

interface Flight {
  flightNumber: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  price: number;
  bookingLink: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  origin: string = '';
  destination: string = '';
  date: string = '';
  flightResults: Flight[] = [];
  private apiUrl = 'http://localhost:3000'; // Replace with your server's API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadAllFlights(); // Load all flights on component initialization
  }

  // Load all available flights
  loadAllFlights() {
    this.http.get<Flight[]>(`${this.apiUrl}/flights`).subscribe(
      results => {
        this.flightResults = results;
      },
      error => {
        console.error('Error loading all flights:', error);
      }
    );
  }

  // Search flights based on parameters
  searchFlights() {
    const searchParams = {
      origin: this.origin,
      destination: this.destination,
      date: this.date,
    };

    this.http.get<Flight[]>(`${this.apiUrl}/flights`, { params: searchParams }).subscribe(
      results => {
        this.flightResults = results;
      },
      error => {
        console.error('Error searching flights:', error);
      }
    );
  }

  // Book a selected flight
  bookFlight(flight: Flight) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    
    this.http.post(`${this.apiUrl}/bookings`, { flightNumber: flight.flightNumber }, { headers }).subscribe(
      response => {
        alert(`Your booking for flight ${flight.flightNumber} was successful!`);
      },
      error => {
        console.error('Error booking flight:', error);
        alert('There was an error booking the flight. Please try again.');
      }
    );
  }
}
