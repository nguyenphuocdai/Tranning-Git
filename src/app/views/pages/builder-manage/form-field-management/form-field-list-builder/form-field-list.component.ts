import { ModalDialogComponent } from "../controls/modal-dialog/modal-dialog.component";
import { DynamicFormComponent } from "../components/dynamic-form/dynamic-form.component";
import { FieldConfigInterface } from "../../../../../core/_model-app/field.interface";
import {
	Component,
	OnInit,
	ChangeDetectorRef,
	ViewChild,
	RenderComponentType,
	TemplateRef
} from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import {
	CdkDragDrop,
	transferArrayItem,
	CdkDragStart,
	CdkDragEnd
} from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material";
@Component({
	selector: "kt-form-field-list",
	templateUrl: "./form-field-list.component.html",
	styleUrls: ["./form-field-list.component.scss"]
})
export class FormFieldListComponent implements OnInit {
	@ViewChild(DynamicFormComponent) dynamicFormControl: DynamicFormComponent;
	panelOpenState: boolean = false;
	regConfig: FieldConfigInterface[] = [];
	items: FieldConfigInterface[] = [];
	todo = [];
	isDragging: boolean = false;
	stableData = [
		{
			type: "input",
			valueView: "Text Field"
		},
		{
			type: "select",
			valueView: "Select Option"
		},
		{
			type: "number",
			valueView: "Number"
		}
		// {
		// 	type: "checkbox",
		// 	valueView: "Check box"
		// },
		// {
		// 	type: "datepicker",
		// 	valueView: "Date Picker"
		// },
		// {
		// 	type: "radiobutton",
		// 	valueView: "Radio Button"
		// }
	];
	/**
	 * Constructor DI
	 * @param _location
	 * @param activatedRoute
	 * @param dialog
	 * @param ref
	 */
	constructor(
		private _location: Location,
		private dialog: MatDialog,
		private ref: ChangeDetectorRef
	) {}

	/**
	 * On init
	 */
	ngOnInit() {
		this.resetList();

		let localData = JSON.parse(localStorage.getItem("regConfig"));
		if (localData) {
			this.items = localData;
		}
	}

	/**
	 * event drop from source to preview (temp not use)
	 * @param event CdkDragDrop
	 */
	drop(event: CdkDragDrop<string[]>) {}

	/**
	 * event drop from preview to source
	 * @param event CdkDragDrop
	 */
	dropFromPreview(event: CdkDragDrop<string[]>) {
		if (event.previousContainer === event.container) {
			return false;
		} else {
			this.dialog
				.open(ModalDialogComponent, {
					data: this.stableData[event.previousIndex],
					width: "70%",
					panelClass: "",
					maxHeight: "90vh"
				})
				.afterClosed()
				.subscribe(response => {
					if (response) {
						transferArrayItem(
							event.previousContainer.data,
							event.container.data,
							event.previousIndex,
							event.currentIndex
						);
						this.items.push(response);
						this.regConfig = this.items;

						// local strorage
						let arrLocal = JSON.parse(
							localStorage.getItem("regConfig")
						);
						if (arrLocal !== null && this.items.length === 0) {
							this.items = this.items.concat(arrLocal);
						}

						for (let i = 0; i < this.items.length; i++) {
							if (this.items[i].hasOwnProperty("valueView")) {
								this.items.splice(i, 1);
							}
						}

						localStorage.setItem(
							"regConfig",
							JSON.stringify(this.items)
						);
						this.ref.markForCheck();
						this.resetList();
						this.dynamicFormControl.ngOnInit();
						console.log(this.regConfig);
					}
				});
		}
	}
	/** Predicate function that doesn't allow items to be dropped into a list. */
	noReturnPredicate() {
		return false;
	}
	/**
	 * reset list source
	 */
	private resetList() {
		this.todo = this.stableData.slice();
	}

	/**
	 * previous routerlink
	 */
	backClicked() {
		this._location.back();
	}

	/**
	 * submit form
	 * @param value
	 */
	submit(value: any) {}

	dragStarted(event: CdkDragStart) {
		this.isDragging = true;
	}

	dragEnded(event: CdkDragEnd) {
		this.isDragging = false;
	}
}
