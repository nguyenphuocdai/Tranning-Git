import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "ktReplaceSpace"
})
export class ReplaceSpacePipe implements PipeTransform {
	transform(
		value: string,
		separate: string = '_'
	) {
		if (!value) {
			return "";
		}
		return `${value.replace(/ /g, separate)}`;
	}
}
