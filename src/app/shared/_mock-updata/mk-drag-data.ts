import { DialogRefInterface } from "../_model-app/dialog-ref.interface";

export const data: DialogRefInterface[] = [
	{
		type: "input",
		valueView: "Text"
	},
	{
		type: "number",
		valueView: "Number"
	},
	{
		type: "money",
		valueView: "Money"
	},
	{
		type: "select",
		valueView: "Select Options"
	},
	{
		type: "lookup",
		valueView: "Lookup"
	},
	{
		type: "fupload",
		valueView: "File Upload"
	},
	
	{
		type: "datepicker",
		valueView: "Date"
	},
	{
		type: "button",
		valueView: "Button"
	},
	{
		type: "formula",
		valueView: "Formula"
	}
	// {
	// 	type: "radiobutton",
	// 	valueView: "Radio"
	// }
];
