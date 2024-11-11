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
  time: string = '';
  flightResults: Flight[] = []; // תוצאות החיפוש של הטיסות
  private apiUrl = 'http://localhost:3000'; // כתובת ה-API של השרת שלך

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    // טעינה של כל הטיסות ברגע שהרכיב נטען
    this.loadAllFlights();
  }

  // פונקציה לטעינת כל הטיסות
  loadAllFlights() {
    this.http.get<Flight[]>(`${this.apiUrl}/flights`)
      .subscribe(results => {
        this.flightResults = results;
      }, error => {
        console.error('Error loading all flights:', error);
      });
  }

  // פונקציה לחיפוש טיסות לפי פרמטרים
  searchFlights() {
    const searchParams = {
      origin: this.origin,
      destination: this.destination,
      date: this.date,
      time: this.time
    };

    this.http.get<Flight[]>(`${this.apiUrl}/flights`, { params: searchParams })
      .subscribe(results => {
        this.flightResults = results;
      }, error => {
        console.error('Error searching flights:', error);
      });
  }

  // פונקציה לבחירת טיסה להצגה
  selectFlight(flight: Flight) {
    alert(`נבחרה טיסה: ${flight.flightNumber} מ${flight.origin} ל${flight.destination} בתאריך ${flight.date} בשעה ${flight.time}`);
  }
}
