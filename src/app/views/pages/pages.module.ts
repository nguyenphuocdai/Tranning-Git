import { MaterialModule } from './material/material.module';
// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// NgBootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
// import { MailModule } from './apps/mail/mail.module';
// import { ECommerceModule } from './apps/e-commerce/e-commerce.module';
import { UserManagementModule } from './user-management/user-management.module';
import { CoreModule } from '../../core/core.module';
import { MyPageComponent } from './my-page/my-page.component';
import { BuilderComponent } from './builder/builder.component';
import { ECommerceModule } from './apps/e-commerce/e-commerce.module';

@NgModule({
	declarations: [
		MyPageComponent,
		BuilderComponent
	],
	exports: [
		BuilderComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		NgbModule,
		CoreModule,
		PartialsModule,
		MaterialModule,
		// MailModule,
		ECommerceModule,
		UserManagementModule,
	],
	providers: []
})
export class PagesModule {
}
