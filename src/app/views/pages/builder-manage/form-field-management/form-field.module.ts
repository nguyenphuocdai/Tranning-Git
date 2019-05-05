import { DragDropComponent } from "./controls/drag-drop/drag-drop.component";
import { CoreModule } from "../../../../core/core.module";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormFieldComponent } from "./form-field.component";
import { FormFieldListComponent } from "./form-field-list-builder/form-field-list.component";
import { MaterialModule } from "../../material/material.module";
import { PartialsModule } from "../../../partials/partials.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { HighlightModule } from "ngx-highlightjs";
import { ModalDialogComponent } from "./controls/modal-dialog/modal-dialog.component";
import { FormFieldEditComponent } from "./form-field-edit/form-field-edit.component";
import { MultiDragDropComponent } from './controls/multi-drag-drop/multi-drag-drop.component';

const routes: Routes = [
	{
		path: "",
		component: FormFieldComponent,
		children: [
			// {
			// 	path: "",
			// 	redirectTo: "form-list",
			// 	pathMatch: "full"
			// },
			{
				path: "builder/:id",
				component: FormFieldListComponent
			}
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		PartialsModule,
		CoreModule,
		PerfectScrollbarModule,
		HighlightModule,
		RouterModule.forChild(routes),
		MaterialModule
	],
	declarations: [
		FormFieldComponent,
		FormFieldListComponent,
		FormFieldEditComponent,
		DragDropComponent,
		ModalDialogComponent,
		MultiDragDropComponent
	],
	entryComponents: [ModalDialogComponent]
})
export class FormFieldModule {}
