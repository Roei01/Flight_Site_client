import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from "@angular/common"
import { NgIf } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../../auth.service';
import { AuthGuard } from '../../app.guard';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideHttpClient } from '@angular/common/http';
import { SlideshowComponent } from '../../components/slideshow/slideshow.component';
import { HeaderComponent } from '../../components/header/header.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common'; //addd
import { RouterModule } from '@angular/router'; // add
import { MatIconModule } from '@angular/material/icon';
import { RemoveSharedPrefixPipe } from './home/remove-shared-prefix.pipe'; // עדכן את הנתיב לפי מיקום ה-Pipe


@NgModule({
    declarations: [
        MainComponent,
        HomeComponent,
        LoginComponent,
        SlideshowComponent,
        HeaderComponent,
        RemoveSharedPrefixPipe,
    ],
    imports: [
        MainRoutingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NgIf,
        MatCheckboxModule,
        CommonModule,
        MatButtonModule, MatCardModule, MatToolbarModule,
        RouterModule, // add
        MatIconModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        provideHttpClient(),
        { provide: LocationStrategy, useClass: HashLocationStrategy } // add
    ],
})
export class MainModule {
}