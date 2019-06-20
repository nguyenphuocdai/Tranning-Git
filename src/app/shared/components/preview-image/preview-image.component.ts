import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
	selector: "kt-preview-image",
	templateUrl: "./preview-image.component.html",
	styleUrls: ["./preview-image.component.scss"]
})
export class PreviewImageComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
	file: any;
	ngOnInit() {
		this.file = this.data.file;
		console.log(this.data);
	}
}
