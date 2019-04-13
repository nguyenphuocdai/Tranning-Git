import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'kt-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {
  constructor(
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		console.log(data);
	}

	openLink(event: MouseEvent): void {
		// this.bottomSheetRef.dismiss();
		event.preventDefault();
	}

	ngOnInit() {}
}
