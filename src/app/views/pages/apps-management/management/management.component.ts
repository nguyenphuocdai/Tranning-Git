import { SolutionModel } from "./../../../../shared/_model-app/solution.model";
import { LocalstorageService } from "./../../../../shared/_services/local-storage-service/localstorage.service";
import { AppSettings } from "./../../../../shared/_constant/app-setting";
import {
	Component,
	OnInit,
	ViewChild,
	ChangeDetectionStrategy
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

/**
 * @title Table with pagination
 */
@Component({
	selector: "kt-solution",
	templateUrl: "./management.component.html",
	styleUrls: ["./management.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagementComponent implements OnInit {
	displayedColumns: string[] = ["id", "name", "owner", "version","actions"];
	dataSource: MatTableDataSource<SolutionModel>;
	listSolution: SolutionModel[] = [];
	constructor(private localstorageService: LocalstorageService) {}
	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngOnInit() {
		let listSolution: SolutionModel[] = this.localstorageService.get(
			AppSettings.SOLUTIONSTORAGE
		);
		this.listSolution = listSolution;

		this.dataSource = new MatTableDataSource(this.listSolution);
		this.dataSource.paginator = this.paginator;
	}
}
