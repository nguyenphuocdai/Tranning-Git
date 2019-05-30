export class MenuConfig {
	public defaults: any = {
		header: {
			self: {}
			// 'items': [
			// {
			// 	'title': 'Pages',
			// 	'root': true,
			// 	'icon-': 'flaticon-add',
			// 	'toggle': 'click',
			// 	'custom-class': 'kt-menu__item--active',
			// 	'alignment': 'left',
			// 	'translate': 'MENU.PAGES',
			// 	'submenu': {
			// 		'type': 'classic',
			// 		'alignment': 'left',
			// 		'items': [
			// 			{
			// 				'title': 'My Account',
			// 				'icon': 'flaticon-file',
			// 				'page': 'index'
			// 			},
			// 			{
			// 				'title': 'Task Manager',
			// 				'icon': 'flaticon-diagram',
			// 				'badge': {
			// 					'type': 'kt-badge--success',
			// 					'value': '2'
			// 				}
			// 			},
			// 			{
			// 				'title': 'Team Manager',
			// 				'icon': 'flaticon-business',
			// 				'submenu': {
			// 					'type': 'classic',
			// 					'alignment': 'right',
			// 					'bullet': 'line',
			// 					'items': [
			// 						{
			// 							'title': 'Add Team Member',
			// 							'icon': ''
			// 						},
			// 						{
			// 							'title': 'Edit Team Member',
			// 							'icon': ''
			// 						},
			// 						{
			// 							'title': 'Delete Team Member',
			// 							'icon': ''
			// 						},
			// 						{
			// 							'title': 'Team Member Reports',
			// 							'icon': ''
			// 						},
			// 						{
			// 							'title': 'Assign Tasks',
			// 							'icon': ''
			// 						},
			// 						{
			// 							'title': 'Promote Team Member',
			// 							'icon': ''
			// 						}
			// 					]
			// 				}
			// 			},
			// 			{
			// 				'title': 'Projects Manager',
			// 				'page': '#',
			// 				'icon': 'flaticon-chat-1',
			// 				'submenu': {
			// 					'type': 'classic',
			// 					'alignment': 'right',
			// 					'bullet': 'dot',
			// 					'items': [
			// 						{
			// 							'title': 'Latest Projects',
			// 							'icon': ''
			// 						},
			// 						{
			// 							'title': 'Ongoing Projects',
			// 							'icon': ''
			// 						},
			// 						{
			// 							'title': 'Urgent Projects',
			// 							'icon': ''
			// 						},
			// 						{
			// 							'title': 'Completed Projects',
			// 							'icon': ''
			// 						},
			// 						{
			// 							'title': 'Dropped Projects',
			// 							'icon': ''
			// 						}
			// 					]
			// 				}
			// 			},
			// 			{
			// 				'title': 'Create New Project',
			// 				'icon': 'flaticon-users'
			// 			}
			// 		]
			// 	}
			// },
			// }
			// ]
		},
		aside: {
			self: {},
			items: [
				{
					title: "Dashboard",
					root: true,
					icon: "flaticon2-architecture-and-city",
					page: "dashboard",
					translate: "MENU.DASHBOARD",
					bullet: "dot"
				},
				// {
				// 	title: "My Page", // <= Title of the page
				// 	desc: "Some my description goes here", // <= Description of the page
				// 	root: true,
				// 	page: "my-page", // <= URL
				// 	icon: "flaticon-line-graph" // <= Choose the icon
				// },
				{
					title: "Management", // <= Title of the page
					root: true,
					bullet: "dot",
					icon: "flaticon2-browser-2", // <= Choose the icon
					submenu: [
						{
							title: "Solution",
							page: "management"
						}
					]
				},
				{ section: "Applications" },
				{
					title: "Builder Management",
					root: true,
					bullet: "dot",
					icon: "flaticon2-delivery-package",
					submenu: [
						{
							title: "Solution list",
							page: "builder/solutions"
						}
					]
				}
			]
		}
	};

	public get configs(): any {
		return this.defaults;
	}
}
