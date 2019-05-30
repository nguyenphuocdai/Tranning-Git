// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
// Fake API Angular-in-memory
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
// Translate Module
import { TranslateModule } from "@ngx-translate/core";
// NGRX
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
// UI
import { PartialsModule } from "../../partials/partials.module";
// Core
import { FakeApiService } from "../../../core/_base/metronic";
// Auth
import { ModuleGuard } from "../../../core/auth";
// Core => Services
import {
	customersReducer,
	CustomerEffects,
	CustomersService,
	productsReducer,
	ProductEffects,
	ProductsService,
	productRemarksReducer,
	ProductRemarkEffects,
	ProductRemarksService,
	productSpecificationsReducer,
	ProductSpecificationEffects,
	ProductSpecificationsService
} from "../../../core/e-commerce";
// Core => Utils
import {
	HttpUtilsService,
	TypesUtilsService,
	InterceptService,
	LayoutUtilsService
} from "../../../core/_base/crud";
// Shared
import {
	ActionNotificationComponent,
	DeleteEntityDialogComponent,
	FetchEntityDialogComponent,
	UpdateStatusDialogComponent
} from "../../partials/content/crud";
// Components
// import { ECommerceComponent } from './e-commerce.component';
// Customers
// import { CustomersListComponent } from './customers/customers-list/customers-list.component';
// import { CustomerEditDialogComponent } from './customers/customer-edit/customer-edit.dialog.component';
// // Products
// import { ProductsListComponent } from './products/products-list/products-list.component';
// import { ProductEditComponent } from './products/product-edit/product-edit.component';
// import { RemarksListComponent } from './products/_subs/remarks/remarks-list/remarks-list.component';
// import { SpecificationsListComponent } from './products/_subs/specifications/specifications-list/specifications-list.component';
// import { SpecificationEditDialogComponent } from './products/_subs/specifications/specification-edit/specification-edit-dialog.component';
// // Orders
// import { OrdersListComponent } from './orders/orders-list/orders-list.component';
// import { OrderEditComponent } from './orders/order-edit/order-edit.component';
// Material
import {
	MatInputModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSortModule,
	MatTableModule,
	MatSelectModule,
	MatMenuModule,
	MatProgressBarModule,
	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatTabsModule,
	MatNativeDateModule,
	MatCardModule,
	MatRadioModule,
	MatIconModule,
	MatDatepickerModule,
	MatAutocompleteModule,
	MAT_DIALOG_DEFAULT_OPTIONS,
	MatSnackBarModule,
	MatTooltipModule
} from "@angular/material";
import { environment } from "../../../../environments/environment";
import { CoreModule } from "../../../core/core.module";
import {
	NgbProgressbarModule,
	NgbProgressbarConfig
} from "@ng-bootstrap/ng-bootstrap";
import { NgxPermissionsModule } from "ngx-permissions";
import { AppsManagementRoutingModule } from "./apps-management-routing.module";
import { AppsManagementComponent } from "./apps-management.component";
import { ManagementComponent } from "./management/management.component";
import { ManagementEditComponent } from "./management-edit/management-edit.component";

@NgModule({
	imports: [
		AppsManagementRoutingModule,
		MatDialogModule,
		CommonModule,
		HttpClientModule,
		PartialsModule,
		NgxPermissionsModule.forChild(),
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
		MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		NgbProgressbarModule,
		environment.isMockEnabled
			? HttpClientInMemoryWebApiModule.forFeature(FakeApiService, {
					passThruUnknownUrl: true,
					dataEncapsulation: false
			  })
			: [],
		StoreModule.forFeature("products", productsReducer),
		EffectsModule.forFeature([ProductEffects]),
		StoreModule.forFeature("customers", customersReducer),
		EffectsModule.forFeature([CustomerEffects]),
		StoreModule.forFeature("productRemarks", productRemarksReducer),
		EffectsModule.forFeature([ProductRemarkEffects]),
		StoreModule.forFeature(
			"productSpecifications",
			productSpecificationsReducer
		),
		EffectsModule.forFeature([ProductSpecificationEffects])
	],
	providers: [
		ModuleGuard,
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		},
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: {
				hasBackdrop: true,
				panelClass: "kt-mat-dialog-container__wrapper",
				height: "auto",
				width: "900px"
			}
		},
		TypesUtilsService,
		LayoutUtilsService,
		HttpUtilsService,
		CustomersService,
		ProductRemarksService,
		ProductSpecificationsService,
		ProductsService,
		TypesUtilsService
	],
	entryComponents: [
		ActionNotificationComponent,
		DeleteEntityDialogComponent,
		FetchEntityDialogComponent,
		UpdateStatusDialogComponent,
		ManagementEditComponent
	],
	declarations: [
		// ECommerceComponent,
		// // Customers
		// CustomersListComponent,
		// CustomerEditDialogComponent,
		// // Orders
		// OrdersListComponent,
		// OrderEditComponent,
		// // Products
		// ProductsListComponent,
		// ProductEditComponent,
		// RemarksListComponent,
		// SpecificationsListComponent,
		// SpecificationEditDialogComponent,
		ManagementComponent,
    ManagementEditComponent,
    AppsManagementComponent
	]
})
export class AppsManagementModule {}
