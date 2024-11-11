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
  flightResults: Flight[] = [];
  private apiUrl = 'http://localhost:3000'; // כתובת ה-API של השרת שלך

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    // טעינה ראשונית של כל הטיסות
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

  // פונקציה להזמנת טיסה
  bookFlight(flight: Flight) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    
    this.http.post(`${this.apiUrl}/bookings`, { flightNumber: flight.flightNumber }, { headers })
      .subscribe(response => {
        alert(`הזמנתך עבור הטיסה ${flight.flightNumber} בוצעה בהצלחה!`);
      }, error => {
        console.error('Error booking flight:', error);
        alert('אירעה שגיאה בעת הזמנת הטיסה. אנא נסה שוב.');
      });
  }
}
