import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { Lightbox } from "ngx-lightbox";

@Component({
	selector: "kt-preview-image",
	templateUrl: "./preview-image.component.html",
	styleUrls: ["./preview-image.component.scss"]
})
export class PreviewImageComponent implements OnInit {
	file: any;
	_album = [];

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private _lightbox: Lightbox
	) {
		for (let i = 0; i < this.data.file.length; i++) {
			const element = this.data.file[i];
			const album = {
				src: element.base64,
				thumb: element.base64
			};

			this._album.push(album);
		}
	}

	ngOnInit() {
		this.file = this.data.file;
	}

	open(index: number): void {
		// open lightbox
		this._lightbox.open(this._album, index);
	}

	close(): void {
		// close lightbox programmatically
		this._lightbox.close();
	}
}
