import { Injectable } from '@angular/core';
import { Patient,PatientJSON,PatientAdapter } from '@models/patient.model' ;
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,first } from 'rxjs/operators';
import { environment } from '@environments/environment';


@Injectable({
	providedIn: 'root'
})

export class PatientsService {
	private baseURL = environment.apiEndpoint + '/api/dah/v0';

	constructor(private patientAdapter: PatientAdapter,
				private http: HttpClient) {
	}

	listUntreated(clinicianID: string) : Observable<Patient[]> {
		return this.http.get(this.baseURL + '/clinicians/' + clinicianID + '/patients').pipe(
			map(item => {
				let items = item as any[];
				let res: Patient[] = [];
				for ( let i of items) {
					const p: Patient = this.patientAdapter.adapt(i);
					if ( p.UnderObservation == true ) {
						res.push(p);
					}
				}
				return res;
			}));
	}

	listAll(clinicianID: string) : Observable<Patient[]> {
		return this.http.get(this.baseURL + '/clinicians/' + clinicianID + '/patients').pipe(
			map(item => {
				let items = item as any[];
				let res: Patient[] = [];
				for ( let i of items) {
					res.push(this.patientAdapter.adapt(i));
				}
				return res;
			}));
	}


	getPatient(patientID: string): Observable<Patient> {
		return this.http.get(this.baseURL + '/patients/' + patientID).pipe(
			map( item => {
				return this.patientAdapter.adapt(item);
			}));
	}

	push(p: Patient) : Observable<any> {
		let data: PatientJSON = {"name": p.Name,
								 "patientID": p.ID,
								 "phone": p.Phone,
								 "language": p.Language,
								 "age": p.Age,
								 "city": p.City,
								 "preconditions": p.Preconditions,
								 "fitness": p.Fitness,
								 "under_observation": p.UnderObservation};
		if ( p.ID.length == 0 ) {
			return this.http.post(this.baseURL + '/patients',data);
		} else {
			return this.http.put(this.baseURL + '/patients',data);
		}
	}



}
