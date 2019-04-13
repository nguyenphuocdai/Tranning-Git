import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../../controls/modal-dialog/modal-dialog.component';

@Component({
  selector: 'kt-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {
  data = {
		animal: "panda"
  };
  constructor(public dialog: MatDialog) {

  }
  movies = [
    'Text Field',
    'Auto Complete',
    'Check box',
    'Date Picker',
    'Slider',
    'Slide Toggle',
    'Radio Button',
    'Select Option'
  ];
  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    // open dialog when drag
    this.dialog.open(ModalDialogComponent, {
			data: this.data,
			width: '70%',
			panelClass: ''
		});
  }
  // openDialog() {
	// 	this.dialog.open(ModalDialogComponent, {
	// 		data: this.data,
	// 		width: '80%',
	// 		panelClass: ''
	// 	});
	// }
}
