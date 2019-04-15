import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "truncate"
})
export class TruncateStrPipe implements PipeTransform {
	transform(
		value: string,
		limit = 25,
		completeWords = false,
		ellipsis = "..."
	) {
		if (!value) {
			return "";
		}
		if (completeWords) {
			limit = value.substr(0, limit).lastIndexOf(" ");
		}
		return `${value.substr(0, limit)}${ellipsis}`;
	}
	// public longStr = 'A really long string that needs to be truncated';
	// <h1>{{longStr | truncate }}</h1>
	// <!-- Outputs: A really long string that... -->

	// <h1>{{longStr | truncate : 12 }}</h1>
	// <!-- Outputs: A really lon... -->

	// <h1>{{longStr | truncate : 12 : true }}</h1>
	// <!-- Outputs: A really... -->

	// <h1>{{longStr | truncate : 12 : false : '***' }}</h1>
	// <!-- Outputs: A really lon*** -->
}
