/**
 * Process format logic for module in app
 */
export default class FunctionBase {
	static replaceSpace(val: string, separate: string = "_") {
		if (val) {
			return;
		}
		return `${val.replace(/ /g, separate)}`;
	}
	static doSomethingElse(val: string) {
		return val;
	}
}
