import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "kt-card-list",
	templateUrl: "./card-list.component.html",
	styleUrls: ["./card-list.component.scss"]
})
export class CardListComponent implements OnInit {

	@Output('eventCardListclick') eventCardListclick = new EventEmitter();

	listProject = [
		{
			id: 0,
			name: "Selena Nieves",
			image: "https://picsum.photos/400/320/?random",
			about:
				"Do ullamco nulla labore incididunt quis. Voluptate ut esse velit consectetur aliquip. Cupidatat velit ipsum consectetur anim sit eiusmod enim velit. Ut elit excepteur aliquip incididunt exercitation consectetur nisi ullamco excepteur do occaecat deserunt ex.\r\n"
		},
		{
			id: 1,
			name: "Lenora Garrett",
			image: "https://picsum.photos/400/320/?random",
			about:
				"Consequat laborum minim reprehenderit exercitation non magna consequat proident sit ipsum nisi sint est. Ut nostrud anim anim id pariatur. Magna occaecat aliquip mollit ut anim velit eiusmod aute dolor laborum dolore mollit minim. Aliqua cupidatat magna velit amet culpa nostrud nostrud exercitation consectetur excepteur labore. Dolor veniam nostrud do fugiat exercitation est ea ea fugiat.\r\n"
		},
		{
			id: 2,
			name: "Tate David",
			image: "https://picsum.photos/400/320/?random",
			about:
				"Minim reprehenderit consequat adipisicing est consectetur. Aliqua consectetur sint qui sit ex eu et nulla ut quis et ex cupidatat. Ut labore laboris velit excepteur irure laboris commodo id quis voluptate veniam elit nostrud. Sit dolore laboris duis enim sint culpa ut.\r\n"
		}
	];
	handleCardListclick(){
		this.eventCardListclick.emit({handleModal : true});
	}
	constructor() {}

	ngOnInit() {}
}
