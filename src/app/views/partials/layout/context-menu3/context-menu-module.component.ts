import { FieldConfigInterface } from "./../../../../shared/_model-app/field.interface";
import { ModuleModel } from "./../../../../shared/_model-app/module.model";
import { ExportJsonToExcelService } from "./../../../../shared/lib/export-json-to-excel/export-json-to-excel.service";
// Angular
import { Component, Input, OnInit } from "@angular/core";

/**
 * Sample context menu dropdown
 */
@Component({
	selector: "kt-context-menu-module",
	templateUrl: "./context-menu-module.component.html",
	styleUrls: ["./context-menu-module.component.scss"]
})
export class ContextMenuModuleComponent implements OnInit {
	@Input("module") module: ModuleModel;

	constructor(private exportJsonToExcelService: ExportJsonToExcelService) {}

	ngOnInit(): void {}

	exportToExcel(event) {
		let arrModule: any[] = [];

		this.module.optionsField.forEach(element => {
			let obj: FieldConfigInterface = {
				id: element["id"],
				name: element["name"],
				fieldType: element["fieldType"],
				inputType: element["inputType"],
				label: element["label"],
				security: element["security"],
				tracking: element["tracking"],
				type: element["type"]
			};

			if (element.validations.length !== 0) {
				element.validations.forEach(item => {
					console.log(item);
				});
			}
			arrModule.push({
				ID: obj.id,
				Name: obj.name,
				"Field Type": obj.fieldType,
				"Input Type": obj.inputType,
				Label: obj.label,
				Security: obj.security,
				Tracking: obj.tracking,
				Type: obj.type,
				"Module Name": this.module["name"],
				"Plural Name": this.module["pluralName"],
				"Access Type": this.module["accessType"]
			});
		});

		this.exportJsonToExcelService.exportAsExcelFile(
			arrModule,
			"export-module-to-excel"
		);
	}
}
