import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth.service';

interface Flight {
  flightNumber: string;
  origin: string;
  destination: string;
  date: string;
  price: number;
  seatsAvailable: number;
}

interface Booking {
  id: string;
  flightNumber: string;
  seatsBooked: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userName: string = '';
  origin: string = '';
  destination: string = '';
  date: string = '';
  flightResults: Flight[] = [];
  userBookings: Booking[] = [];
  showSuccessMessage: boolean = false;
  successMessage: string = '';
  private apiUrl = 'https://flight-site-server.onrender.com'; // Backend API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserName();
    this.loadAllFlights();
    this.loadUserBookings();
  }


  loadUserName(): void {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token); // מפענח את הטוקן
      this.userName = decodedToken.username; // שומר את שם המשתמש
    }
  }
  
  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  
  // Load all available flights
  loadAllFlights(): void {
    this.http.get<Flight[]>(`${this.apiUrl}/flights`).subscribe(
      (results) => (this.flightResults = results),
      (error) => console.error('Error loading flights:', error)
    );
  }

  // Load user bookings
  loadUserBookings(): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    this.http.get<Booking[]>(`${this.apiUrl}/bookings`, { headers }).subscribe(
      (bookings) => (this.userBookings = bookings),
      (error) => console.error('Error loading user bookings:', error)
    );
  }

  // Toggle booking for a flight
  toggleBooking(flight: Flight): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    this.http.post<{ message: string }>(
      `${this.apiUrl}/bookings`,
      { flightNumber: flight.flightNumber, seats: 1 }, // הוספת מושב אחד או ביטול
      { headers }
    ).subscribe(
      (response) => {
        this.successMessage = response.message; // הצגת הודעת הצלחה
        this.showSuccessMessage = true;
        setTimeout(() => (this.showSuccessMessage = false), 3000);
        this.loadAllFlights();
        this.loadUserBookings();
      },
      (error) => {
        console.error('Error toggling booking:', error);
        alert('Failed to toggle booking. Please try again.');
      }
    );
  }

  // Check if the user has booked the flight
  hasBooked(flightNumber: string): boolean {
    return this.userBookings.some((booking) => booking.flightNumber === flightNumber);
  }

  

  searchFlights(): void {
    // בניית פרמטרי החיפוש רק עם הערכים שהוזנו
    const searchParams: any = {};
    if (this.origin.trim()) {
      searchParams.origin = this.origin.trim();
    }
    if (this.destination.trim()) {
      searchParams.destination = this.destination.trim();
    }
    if (this.date) {
      searchParams.date = this.date;
    }
  
    // אם לא הוזן אף פרמטר, שלח בקשה לקבלת כל הטיסות
    if (Object.keys(searchParams).length === 0) {
      this.http.get<Flight[]>(`${this.apiUrl}/flights`).subscribe(
        (results) => {
          this.flightResults = results; // עדכון תוצאות החיפוש
          if (results.length === 0) {
            alert('No flights found.');
          }
        },
        (error) => {
          console.error('Error fetching all flights:', error);
          alert('An error occurred while fetching all flights. Please try again.');
        }
      );
      return;
    }
  
    // קריאה לשרת עם פרמטרי החיפוש
    this.http.get<Flight[]>(`${this.apiUrl}/search-flights`, { params: searchParams }).subscribe(
      (results) => {
        this.flightResults = results; // עדכון תוצאות החיפוש
        if (results.length === 0) {
          alert('No flights found matching your criteria.');
        }
      },
      (error) => {
        console.error('Error searching flights:', error);
        alert('An error occurred while searching for flights. Please try again.');
      }
    );
  }
    // פונקציית logout
    logout() {
      this.authService.logout();
    }

}
