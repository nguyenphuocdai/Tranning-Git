import { Injectable, NgZone } from "@angular/core";
import {
	MatSnackBar,
	MatSnackBarConfig,
	MatSnackBarHorizontalPosition,
	MatSnackBarVerticalPosition,
	MatSnackBarRef
} from "@angular/material";

@Injectable({
	providedIn: "root"
})
export class KtSnackBarService {
	/**
	 * Init class
	 * @param snackBar
	 * @param zone
	 */
	constructor(private snackBar: MatSnackBar, private zone: NgZone) {}

	/**
	 * Dynamic snackbar notification
	 * @param message
	 * @param autoHide
	 * @param verticalPosition
	 * @param horizontalPosition
	 * @param setAutoHide
	 * @param panelClass
	 */
	openSnackBar(
		message: string = "Message Default",
		autoHide: number = 3000,
		verticalPosition: MatSnackBarVerticalPosition = "bottom",
		horizontalPosition: MatSnackBarHorizontalPosition = "center",
		setAutoHide: boolean = true,
		panelClass: string = "",
		action: boolean = true,
		actionButtonLabel: string = ""
	) {
		let config = new MatSnackBarConfig();
		config.verticalPosition = verticalPosition;
		config.horizontalPosition = horizontalPosition;
		config.duration = setAutoHide ? autoHide : 0;
		config.panelClass = panelClass;
		// this.zone.run(() => {
		this.snackBar.open(
			message,
			action ? actionButtonLabel : undefined,
			config
		);
		// });
	}
}
