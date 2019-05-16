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
import { FieldConfigInterface } from "./../../../../../../core/auth";

@Component({
	exportAs: "dynamicForm",
	selector: "dynamic-form",
	template: `
		<form
			class="dynamic-form"
			[formGroup]="form"
			(submit)="onSubmit($event)"
		>
			<ng-container
				*ngFor="let field of fields"
				dynamicField
				[field]="field"
				[group]="form"
			>
			</ng-container>
		</form>
	`,
	styles: []
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
	constructor(private fb: FormBuilder) {
		console.log("fields");
		console.log(this.fields);
	}

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
}
