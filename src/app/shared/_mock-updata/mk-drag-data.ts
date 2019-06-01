import { DialogRefInterface } from "../_model-app/dialog-ref.interface";

export const data: DialogRefInterface[] = [
	{
		type: "input",
		valueView: "Text"
	},
	{
		type: "select",
		valueView: "Select"
	},
	{
		type: "number",
		valueView: "Number"
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
		type: "money",
		valueView: "Money"
	},
	{
		type: "datepicker",
		valueView: "Date"
	},
	{
		type: "button",
		valueView: "Button"
	}
	// {
	// 	type: "radiobutton",
	// 	valueView: "Radio"
	// }
];
