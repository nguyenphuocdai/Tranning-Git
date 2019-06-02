import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges
} from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl
} from "@angular/forms";
import { FieldConfigInterface } from "../../_model-app/field.interface";
@Component({
	exportAs: "dynamicForm",
	selector: "kt-dynamic-form",
	templateUrl: "dynamic-form.component.html",
	styleUrls: ["dynamic-form.component.scss"]
})
export class DynamicFormComponent implements OnInit, OnChanges {
	@Input() fields: FieldConfigInterface[] = [];
	@Output() submit: EventEmitter<any> = new EventEmitter<any>();
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
	onDelete(event) {
		if (event) {
			this.fields = event;
			this.ngOnInit();
		}
	}
}
