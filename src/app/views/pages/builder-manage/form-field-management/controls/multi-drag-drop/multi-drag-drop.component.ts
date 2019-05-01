import { Component, OnInit } from "@angular/core";
import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem
} from "@angular/cdk/drag-drop";

@Component({
	selector: "kt-multi-drag-drop",
	templateUrl: "./multi-drag-drop.component.html",
	styleUrls: ["./multi-drag-drop.component.scss"]
})
export class MultiDragDropComponent implements OnInit {
	constructor() {}

	todo = ["Get to work", "Pick up groceries", "Go home", "Fall asleep"];

	done = [
		"Get up",
		"Brush teeth",
		"Take a shower",
		"Check e-mail",
		"Walk dog"
	];
	ngOnInit() {}

	drop(event: CdkDragDrop<string[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		}
	}
}
