// Angular
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// Components
import { BaseComponent } from "./base/base.component";
import { ErrorPageComponent } from "./content/error-page/error-page.component";
// Auth
import { AuthGuard } from "../../../core/auth";

const routes: Routes = [
	{
		path: "",
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: "dashboard",
				loadChildren:
					"app/views/pages/dashboard/dashboard.module#DashboardModule"
			},
			{
				path: "ecommerce",
				loadChildren:
					"app/views/pages/apps/e-commerce/e-commerce.module#ECommerceModule"
				// canActivate: [NgxPermissionsGuard],
				// data: {
				//  	permissions: {
				//  		only: ['accessToECommerceModule'],
				//  		redirectTo: 'error/403'
				// 	}
				// }
			},
			{
				path: "user-management",
				loadChildren:
					"app/views/pages/user-management/user-management.module#UserManagementModule"
			},
			{
				path: "build-form-field",
				loadChildren:
					"app/views/pages/builder-manage/form-field-management/form-field.module#FormFieldModule"
			},
			{
				path: "builder",
				loadChildren:
					"app/views/pages/builder-manage/builder-manage.module#BuilderManageModule"
			},
			{
				path: "management",
				loadChildren:
					"app/views/pages/apps-management/apps-management.module#AppsManagementModule"
			},
			{
				path: "error/403",
				component: ErrorPageComponent,
				data: {
					type: "error-v6",
					code: 403,
					title: "403... Access forbidden",
					desc:
						"Looks like you don't have permission to access for requested page.<br> Please, contact administrator"
				}
			},
			{ path: "error/:type", component: ErrorPageComponent },
			{ path: "", redirectTo: "dashboard", pathMatch: "full" },
			{ path: "**", redirectTo: "dashboard", pathMatch: "full" }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {}
