import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppsManagementComponent } from "./apps-management.component";
import { ManagementComponent } from "./management/management.component";

// tslint:disable-next-line:class-name
const routes: Routes = [
	{
		path: "",
		component: AppsManagementComponent,
		children: [
			{
				path: "module/:id",
				component: ManagementComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AppsManagementRoutingModule {}
