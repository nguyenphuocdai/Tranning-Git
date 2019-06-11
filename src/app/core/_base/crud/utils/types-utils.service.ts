/** Angular */
import { Injectable } from "@angular/core";

@Injectable()
export class TypesUtilsService {
	/**
	 * Convert number to string and addinng '0' before
	 *
	 * @param value: number
	 */
	padNumber(value: number) {
		if (this.isNumber(value)) {
			return `0${value}`.slice(-2);
		} else {
			return "";
		}
	}

	/**
	 * Checking value type equals to Number
	 *
	 * @param value: any
	 */
	isNumber(value: any): boolean {
		return !isNaN(this.toInteger(value));
	}

	/**
	 * Covert value to number
	 *
	 * @param value: any
	 */
	toInteger(value: any): number {
		return parseInt(`${value}`, 10);
	}

	/**
	 * Convert date to string with 'MM/dd/yyyy' format
	 *
	 * @param date: Date
	 */
	dateFormat(date: Date): string {
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const year = date.getFullYear();
		if (date) {
			return `${month}/${day}/${year}`;
		}

		return "";
	}

	/**
	 * Convert Date to string with custom format 'MM/dd/yyyy'
	 *
	 * @param date: any
	 */
	dateCustomFormat(date: any): string {
		let stringDate: string = "";
		if (date) {
			stringDate += this.isNumber(date.month)
				? this.padNumber(date.month) + "/"
				: "";
			stringDate += this.isNumber(date.day)
				? this.padNumber(date.day) + "/"
				: "";

			stringDate += date.year;
		}
		return stringDate;
	}

	/**
	 * Convert string to DateFormatter (For Reactive Forms Validators)
	 *
	 * @param dateInStr: string (format => 'MM/dd/yyyy')
	 */
	getDateFormatterFromString(dateInStr: string): any {
		if (dateInStr && dateInStr.length > 0) {
			const dateParts = dateInStr.trim().split("/");
			return [
				{
					year: this.toInteger(dateParts[2]),
					month: this.toInteger(dateParts[0]),
					day: this.toInteger(dateParts[1])
				}
			];
		}

		const _date = new Date();
		return [
			{
				year: _date.getFullYear(),
				month: _date.getMonth() + 1,
				day: _date.getDay()
			}
		];
	}

	/**
	 * Convert string to Date
	 *
	 * @param dateInStr: string (format => 'MM/dd/yyyy')
	 */
	getDateFromString(dateInStr: string = ""): Date {
		if (dateInStr && dateInStr.length > 0) {
			const dateParts = dateInStr.trim().split("/");
			const year = this.toInteger(dateParts[2]);
			const month = this.toInteger(dateParts[0]);
			const day = this.toInteger(dateParts[1]);
			// tslint:disable-next-line:prefer-const
			let result = new Date();
			result.setDate(day);
			result.setMonth(month - 1);
			result.setFullYear(year);
			return result;
		}

		return new Date();
	}

	/**
	 * Convert Date to string with format 'MM/dd/yyyy'
	 * @param _date: Date?
	 */
	getDateStringFromDate(_date: Date = new Date()): string {
		const month = _date.getMonth() + 1;
		const year = _date.getFullYear();
		const date = _date.getDate();
		return `${month}/${date}/${year}`;
	}

	removeUnicode(str) {
		str = str.toLowerCase();
		//     We can also use this instead of from line 11 to line 17
		//     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
		//     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
		//     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
		//     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
		//     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
		//     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
		//     str = str.replace(/\u0111/g, "d");
		str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
		str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
		str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
		str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
		str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
		str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
		str = str.replace(/đ/g, "d");
		// Some system encode vietnamese combining accent as individual utf-8 characters
		str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
		str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
		str = str.replace(/\s/g, "");
		return str;
	}
	randomGuid() {
		return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
			let r = (Math.random() * 16) | 0,
				v = c == "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}
	isEmptyOrSpaces(str: string) {
		return str === null || str.match(/^ *$/) !== null;
	}

	isEmptyString(str) {
		return !str || 0 === str.length;
	}

	digitAddComma(str: any) {
		if (typeof str !== "string") {
			str = str.toString();
		}
		if (!str || str.length <= 3) {
			return;
		}
		return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	digitRemoveComma(str: any) {
		if (typeof str !== "string") {
			str = str.toString();
		}
		if (!str || str.length <= 3) {
			return;
		}
		return str.replace(",", "");
	}
	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	makeid(length: number = 16) {
		let result = "";
		let characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * charactersLength)
			);
		}
		return result;
	}

	isEquivalent(a, b) {
		// Create arrays of property names
		let aProps = Object.getOwnPropertyNames(a);
		let bProps = Object.getOwnPropertyNames(b);

		// If number of properties is different,
		// objects are not equivalent
		if (aProps.length !== bProps.length) {
			return false;
		}

		for (let i = 0; i < aProps.length; i++) {
			let propName = aProps[i];

			// If values of same property are not equal,
			// objects are not equivalent
			if (a[propName] !== b[propName]) {
				return false;
			}
		}

		return true;
		// console.log(isEquivalent(bobaFett, jangoFett));
	}
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}
