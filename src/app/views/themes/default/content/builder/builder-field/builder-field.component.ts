import { Component, OnInit, ViewChild } from '@angular/core';
import { LayoutConfigModel, LayoutConfigService } from '../../../../../../core/_base/layout';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'kt-builder-field',
	templateUrl: './builder-field.component.html',
	styleUrls: ['./builder-field.component.scss']
})
export class BuilderFieldComponent implements OnInit {
	// Public properties
	model: LayoutConfigModel;
	@ViewChild('form') form: NgForm;

	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 */
	constructor(private layoutConfigService: LayoutConfigService) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.model = this.layoutConfigService.getConfig();
	}

	/**
	 * Reset preview
	 *
	 * @param e: Event
	 */
	resetPreview(e: Event): void {
		e.preventDefault();
		this.layoutConfigService.resetConfig();
		location.reload();
	}

	/**
	 * Submit preview
	 *
	 * @param e: Event
	 */
	submitPreview(e: Event): void {
		this.layoutConfigService.setConfig(this.model, true);
		location.reload();
	}
}
