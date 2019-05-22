import {
	CdkDragDrop,
	transferArrayItem,
	CdkDragStart,
	CdkDragEnd,
	moveItemInArray
} from "@angular/cdk/drag-drop";
import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	ViewChild,
	QueryList
} from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl
} from "@angular/forms";
import { FieldConfigInterface } from "./../../../../../../core/auth";
import { StickyControlComponent } from "../sticky-control/sticky-control.component";

@Component({
	exportAs: "dynamicForm",
	selector: "dynamic-form",
	template: `
		<form
			class="dynamic-form"
			[formGroup]="form"
			(submit)="onSubmit($event)"
		>
			<ng-container *ngTemplateOutlet="content"></ng-container>
			<ng-template #content>
				<div
					cdkDropList
					(cdkDropListDropped)="drop($event)"
					class="example-list"
				>
					<div
						*ngFor="let field of fields; trackBy: trackByFn"
						class="form-group kt-relative"
						cdkDrag
					>
						<div
							class="example-custom-placeholder"
							*cdkDragPlaceholder
						></div>

						<div dynamicField [field]="field" [group]="form"></div>
						<kt-sticky-control [field]="field"></kt-sticky-control>
					</div>
				</div>
			</ng-template>
		</form>
	`,
	styles: [
		`
			.dynamic-form {
				padding-right: 50px;
			}
			.example-custom-placeholder {
				background: #ccc;
				border: dotted 2px #999;
				min-height: 41px;
				transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
			}
			.cdk-drag-preview {
				box-sizing: border-box;
				background: #eee;
			}
			.cdk-drag-animating {
				transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
			}

			.example-box:last-child {
				border: none;
			}

			.example-list.cdk-drop-list-dragging
				.example-box:not(.cdk-drag-placeholder) {
				transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
			}
		`
	]
})
export class DynamicFormComponent implements OnInit, OnChanges {
	@Input() fields: FieldConfigInterface[] = [];
	@Output() submit: EventEmitter<any> = new EventEmitter<any>();
	hoveredIndex: number;
	form: FormGroup;

	get value() {
		if (this.form === undefined) {
			return;
		}
		return this.form.value;
	}
	constructor(private fb: FormBuilder) {}
	ngOnInit() {
		this.form = this.createControl();
	}
	ngOnChanges(changes: SimpleChanges) {
		if (changes.fields.currentValue !== changes.fields.previousValue) {
			this.form = this.createControl();
		}
	}
	onSubmit(event: Event) {
		event.preventDefault();
		event.stopPropagation();
		if (this.form.valid) {
			this.submit.emit(this.form.value);
		} else {
			this.validateAllFormFields(this.form);
		}
	}

	createControl() {
		const group = this.fb.group({});
		this.fields.forEach(field => {
			if (field.type === "button") {
				return;
			}
			const control = this.fb.control(
				field.value,
				this.bindValidations(field.validations || [])
			);
			group.addControl(field.name, control);
		});
		return group;
	}

	bindValidations(validations: any) {
		if (validations.length > 0) {
			const validList = [];
			validations.forEach(valid => {
				if (
					valid.name === "required" &&
					valid.validator === undefined
				) {
					let obj = new FormControl("", [Validators.required]);
					validList.push(obj.validator);
				} else {
					validList.push(valid.validator);
				}
			});
			return Validators.compose(validList);
		}
		return null;
	}

	validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			control.markAsTouched({ onlySelf: true });
		});
	}
	drop(event: CdkDragDrop<string[]>) {
		console.log("drop");
		moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
	}
	trackByFn(index, item) {
		return index; // or item.id
	}
}

// <ng-container
// *ngFor="let field of fields"
// dynamicField
// [field]="field"
// [group]="form"
// [cdkDragging]="cdkDrag"
// >
// </ng-container>
