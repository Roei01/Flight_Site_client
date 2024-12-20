import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../../app.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'; //addd

const routes: Routes = [
    {
        path: "",
        component: MainComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'home-page', component: HomeComponent, canActivate: [AuthGuard] },
            { path: '**', redirectTo: '/login' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy } //add
    ],
})

export class MainRoutingModule { }