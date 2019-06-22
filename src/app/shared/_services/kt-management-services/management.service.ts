import { LocalstorageService } from "./../local-storage-service/localstorage.service";
import { Injectable } from "@angular/core";
import { AppSettings } from "../../_constant/app-setting";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class ManagementService {
	dataModules = [];
	public currentDataModules: Observable<any[]>;
	private currentDataModulesubject: BehaviorSubject<any[]>;

	constructor(private localStorageService: LocalstorageService) {
		this.currentDataModulesubject = new BehaviorSubject<any[]>(
			this.localStorageService.get(AppSettings.DATASTORAGE)
		);
		this.currentDataModules = this.currentDataModulesubject.asObservable();
	}

	getAll() {}

	/**
	 * Store data submit to local storage
	 * @param value
	 */
	addDataModule(value, moduleId) {
		if (!value) {
			return;
		}
		let localData = this.localStorageService.get(AppSettings.DATASTORAGE);
		if (!localData) {
			localData = [
				{
					moduleId: moduleId,
					data: []
				}
			];
		}
		for (let i = 0; i < localData.length; i++) {
			const element = localData[i];
			if (element.moduleId === moduleId) {
				element.data.push(value);

				this.localStorageService.set(
					AppSettings.DATASTORAGE,
					localData
				);
				this.currentDataModulesubject.next(localData);
				return;
			}
		}
	}

	editDataModule(value, moduleId) {
		if (!value) {
			return;
		}
		let localData = this.localStorageService.get(AppSettings.DATASTORAGE);
		let dataModule = localData.find(
			element => element.moduleId === moduleId
		);

		let arr = dataModule.data;

		for (let i = 0; i < arr.length; i++) {
			const element = arr[i];
			if (element.id === value.id) {
				dataModule.data[i] = value;
				this.localStorageService.set(
					AppSettings.DATASTORAGE,
					localData
				);
				this.currentDataModulesubject.next(localData);
				return;
			}
		}
	}

	deleteDataModule(value, moduleId) {
		if (!value) {
			return;
		}
		let localData = this.localStorageService.get(AppSettings.DATASTORAGE);
		let dataModule = localData.find(
			element => element.moduleId === moduleId
		);

		let arr = dataModule.data;

		for (let i = 0; i < arr.length; i++) {
			const element = arr[i];
			if (element.id === value.id) {
				dataModule.data.splice(i, 1);
				this.localStorageService.set(
					AppSettings.DATASTORAGE,
					localData
				);
				this.currentDataModulesubject.next(localData);
				return;
			}
		}
	}
}
