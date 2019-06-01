import { LocalstorageService } from "./../../../../shared/_services/local-storage-service/localstorage.service";
import {
	Component,
	OnInit,
	ViewChild,
	ChangeDetectionStrategy
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";

/**
 * @title Table with pagination
 */
@Component({
	selector: "kt-management",
	templateUrl: "./management.component.html",
	styleUrls: ["./management.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagementComponent implements OnInit {
	constructor(
		private localstorageService: LocalstorageService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			const id = params["id"];
			if (id && id.length > 0) {
				console.log(id);
			}
		});
	}
}
