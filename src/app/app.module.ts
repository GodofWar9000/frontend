import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PatientsComponent, NgbdSortableHeader } from './patients/patients.component';
import { OrganizationsComponent } from './organizations/organizations.component';


@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		HomeComponent,
		PatientsComponent,
		NgbdSortableHeader,
		OrganizationsComponent
	],
	imports: [
		RouterModule.forRoot(ROUTES),
		NgbModule,
		BrowserModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})

export class AppModule { }
