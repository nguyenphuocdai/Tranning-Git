// Angular
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "auth",
		loadChildren: "app/views/pages/auth/auth.module#AuthModule"
	},

	{ path: "", redirectTo: "", pathMatch: "full" },
	{
		path: "",
		loadChildren: "app/views/themes/default/theme.module#ThemeModule"
	},
	{ path: "**", redirectTo: "default/error/403", pathMatch: "full" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
