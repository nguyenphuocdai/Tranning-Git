import { SharedModule } from "./../../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { PartialsModule } from "../../partials/partials.module";
import {
	ActionNotificationComponent,
	DeleteEntityDialogComponent,
	FetchEntityDialogComponent,
	UpdateStatusDialogComponent
} from "../../partials/content/crud";

import { AppsManagementRoutingModule } from "./apps-management-routing.module";
import { AppsManagementComponent } from "./apps-management.component";
import { ManagementComponent } from "./management/management.component";
import { ManagementEditComponent } from "./management-edit/management-edit.component";
import { MaterialModule } from "../material/material.module";
import { ManagementDynamicFormComponent } from "./management-dynamic-form/management-dynamic-form.component";
import { ManagementModalComponent } from './management-modal/management-modal.component';

@NgModule({
	imports: [
		AppsManagementRoutingModule,
		CommonModule,
		HttpClientModule,
		PartialsModule,
		FormsModule,
		MaterialModule,
		ReactiveFormsModule,
		SharedModule
	],
	providers: [],
	entryComponents: [
		ActionNotificationComponent,
		DeleteEntityDialogComponent,
		FetchEntityDialogComponent,
		UpdateStatusDialogComponent,
		ManagementEditComponent,
		ManagementModalComponent
	],
	declarations: [
		ManagementComponent,
		ManagementEditComponent,
		AppsManagementComponent,
		ManagementDynamicFormComponent,
		ManagementModalComponent
	]
})
export class AppsManagementModule {}
