import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MaterialComponent } from "./material.component";
import { AutocompleteComponent } from "./formcontrols/autocomplete/autocomplete.component";
import { CheckboxComponent } from "./formcontrols/checkbox/checkbox.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CodePreviewModule } from "../../partials/content/general/code-preview/code-preview.module";
import { PartialsModule } from "../../partials/partials.module";
import { CoreModule } from "../../../core/core.module";
import { MaterialPreviewModule } from "../../partials/content/general/material-preview/material-preview.module";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatRippleModule, MatOptionModule } from "@angular/material/core";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIconRegistry } from "@angular/material/icon";
import {
	MatAutocompleteModule,
	MatNativeDateModule,
	MatFormFieldModule,
	MatInputModule,
	MatRadioModule,
	MatButtonModule,
	MatCardModule,
	MatChipsModule,
	MatSelectModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatIconModule,
	MatSliderModule,
	MatPaginatorModule,
	MatSortModule,
	MatSidenavModule,
	MatSnackBarModule,
	MatToolbarModule,
	MatDividerModule,
	MatTabsModule,
	MatTableModule,
	MatTooltipModule,
	MatListModule,
	MatGridListModule,
	MatButtonToggleModule,
	MatBottomSheetModule,
	MatExpansionModule,
	_MatChipListMixinBase,
	MatMenuModule,
	MatTreeModule,
	MAT_BOTTOM_SHEET_DATA,
	MatBottomSheetRef,
	MAT_DATE_LOCALE,
	MAT_DATE_FORMATS,
	MatHorizontalStepper,
	MatStepperModule,
	MatToolbar,
	MatToolbarRow,
	MatSelectTrigger
} from "@angular/material";
import { MatCheckboxModule } from "@angular/material/checkbox";

// Form controls
import { DatepickerComponent } from "./formcontrols/datepicker/datepicker.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormfieldComponent } from "./formcontrols/formfield/formfield.component";
import { InputComponent } from "./formcontrols/input/input.component";
import { RadiobuttonComponent } from "./formcontrols/radiobutton/radiobutton.component";
import { SelectComponent } from "./formcontrols/select/select.component";
import { SliderComponent } from "./formcontrols/slider/slider.component";
import { SlidertoggleComponent } from "./formcontrols/slidertoggle/slidertoggle.component";
// Navigation
import { MenuComponent } from "./navigation/menu/menu.component";
import { SidenavComponent } from "./navigation/sidenav/sidenav.component";
import { ToolbarComponent } from "./navigation/toolbar/toolbar.component";
// Layout
import { CardComponent } from "./layout/card/card.component";
import { DividerComponent } from "./layout/divider/divider.component";
import { ExpansionPanelComponent } from "./layout/expansion-panel/expansion-panel.component";
import { GridListComponent } from "./layout/grid-list/grid-list.component";
import { ListComponent } from "./layout/list/list.component";
import { MaterialTabsComponent } from "./layout/material-tabs/material-tabs.component";
import { StepperComponent } from "./layout/stepper/stepper.component";
import { TreeComponent } from "./layout/tree/tree.component";
import { DefaultFormsComponent } from "./layout/default-forms/default-forms.component";
// Buttons & indicators
import { ButtonComponent } from "./buttons-and-indicators/button/button.component";
import { ButtonToggleComponent } from "./buttons-and-indicators/button-toggle/button-toggle.component";
import { ChipsComponent } from "./buttons-and-indicators/chips/chips.component";
import { IconComponent } from "./buttons-and-indicators/icon/icon.component";
import { ProgressBarComponent } from "./buttons-and-indicators/progress-bar/progress-bar.component";
import { ProgressSpinnerComponent } from "./buttons-and-indicators/progress-spinner/progress-spinner.component";
import { RipplesComponent } from "./buttons-and-indicators/ripples/ripples.component";
// Popups & modals
import {
	DialogComponent,
	ModalComponent,
	Modal2Component,
	Modal3Component
} from "./popups-and-modals/dialog/dialog.component";
import { SnackbarComponent } from "./popups-and-modals/snackbar/snackbar.component";
import { MaterialTooltipComponent } from "./popups-and-modals/material-tooltip/material-tooltip.component";
import { BottomSheetComponent } from "./popups-and-modals/bottom-sheet/bottom-sheet.component";
import { BottomSheetExampleComponent } from "./popups-and-modals/bottom-sheet/bottom-sheet-example/bottom-sheet-example.component";
import { PizzaPartyComponent } from "./popups-and-modals/snackbar/pizza-party.component";
// Data table
import { PaginatorComponent } from "./data-table/paginator/paginator.component";
import { SortHeaderComponent } from "./data-table/sort-header/sort-header.component";
import { MaterialTableComponent } from "./data-table/material-table/material-table.component";
import {
	MAT_MOMENT_DATE_ADAPTER_OPTIONS,
	MatMomentDateModule
} from "@angular/material-moment-adapter";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ModalBottomSheetComponent } from "./controls/modal-bottom-sheet/modal-bottom-sheet.component";
import { CdkTableModule} from '@angular/cdk/table';
import { LightboxModule } from 'ngx-lightbox';

const routes: Routes = [
	{
		path: "",
		component: MaterialComponent,
		children: [
			{
				path: "form-controls/autocomplete",
				component: AutocompleteComponent
			},
		]
	}
];

@NgModule({
	imports: [
		// material modules
		DragDropModule,
		MatInputModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatAutocompleteModule,
		MatListModule,
		MatSliderModule,
		MatCardModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		MatNativeDateModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		MatMenuModule,
		MatTabsModule,
		MatTooltipModule,
		MatSidenavModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTableModule,
		MatGridListModule,
		MatToolbarModule,
		MatBottomSheetModule,
		MatExpansionModule,
		MatDividerModule,
		MatSortModule,
		MatStepperModule,
		MatChipsModule,
		MatPaginatorModule,
		MatDialogModule,
		MatRippleModule,
		CoreModule,
		CommonModule,
		MatRadioModule,
		MatTreeModule,
		MatButtonToggleModule,
		PartialsModule,
		MaterialPreviewModule,
		FormsModule,
		ReactiveFormsModule,
		CodePreviewModule,
		RouterModule.forChild(routes),
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatListModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatMomentDateModule,
		MatSelectModule,
		MatOptionModule,
		MatCheckboxModule,
		MatRadioModule,
		MatIconModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		CdkTableModule,
		LightboxModule
	],
	exports: [
		RouterModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatAutocompleteModule,
		MatSliderModule,
		MatIconModule,
		MatCheckboxModule,
		MatTabsModule,
		MaterialTableComponent,
		MatMenuModule,
		MatCardModule,
		MatHorizontalStepper,
		MatStepperModule,
		MatToolbar,
		MatToolbarRow,
		MatDialogModule,
		DragDropModule,
		MatSelectModule,
		MatSelectTrigger,
		MatListModule,
		MatTooltipModule,
		MatIconModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatListModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatMomentDateModule,
		MatSelectModule,
		MatOptionModule,
		MatCheckboxModule,
		MatRadioModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatTableModule,
		MatPaginatorModule,
		CdkTableModule,
		LightboxModule
	],
	entryComponents: [
		PizzaPartyComponent,
		DialogComponent,
		ModalComponent,
		Modal2Component,
		Modal3Component,
		IconComponent,
		TreeComponent,
		BottomSheetExampleComponent,
		ModalBottomSheetComponent
	],
	providers: [
		MatIconRegistry,
		{ provide: MatBottomSheetRef, useValue: {} },
		{ provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
		{ provide: MAT_DATE_LOCALE, useValue: "en-GB" },
		{
			provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
			useValue: { useUtc: true }
		},
		{ provide: MatDialogRef, useValue: {} }
	],
	declarations: [
		MaterialComponent,
		AutocompleteComponent,
		CheckboxComponent,
		DatepickerComponent,
		FormfieldComponent,
		InputComponent,
		RadiobuttonComponent,
		SelectComponent,
		SliderComponent,
		SlidertoggleComponent,
		MenuComponent,
		SidenavComponent,
		ToolbarComponent,
		CardComponent,
		DividerComponent,
		ExpansionPanelComponent,
		GridListComponent,
		ListComponent,
		MaterialTabsComponent,
		StepperComponent,
		ButtonComponent,
		ButtonToggleComponent,
		ChipsComponent,
		IconComponent,
		ProgressBarComponent,
		ProgressSpinnerComponent,
		DialogComponent,
		ModalComponent,
		Modal2Component,
		Modal3Component,
		PizzaPartyComponent,
		SnackbarComponent,
		MaterialTooltipComponent,
		PaginatorComponent,
		SortHeaderComponent,
		MaterialTableComponent,
		DefaultFormsComponent,
		TreeComponent,
		BottomSheetComponent,
		BottomSheetExampleComponent,
		RipplesComponent,
		ModalBottomSheetComponent
	]
})
export class MaterialModule {}
