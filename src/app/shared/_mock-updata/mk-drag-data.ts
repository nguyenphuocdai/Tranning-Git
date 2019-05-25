import { DialogRefInterface } from "../_model-app/dialog-ref.interface";

export const data: DialogRefInterface[] = [
	{
		type: "input",
		valueView: "Text Field"
	},
	{
		type: "select",
		valueView: "Select Option"
	},
	{
		type: "number",
		valueView: "Number"
	},
	{
		type: "lookup",
		valueView: "Lookup Field"
	},
	{
		type: "fupload",
		valueView: "File Upload"
	},
	{
		type: "money",
		valueView: "Money Field"
	},
	{
		type: "datepicker",
		valueView: "Date Picker"
	},
	{
		type: "button",
		valueView: "Button"
	}
];
