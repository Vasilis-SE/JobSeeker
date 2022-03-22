export default class Validator {
    private static _ALL = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/ // All special chars
    private static _ALLEXCDD  = /[!@#$%^&*()_+\=\[\]{};':"\\|<>\/?]+/ // All except dashes, dots and commas

    static getRegexByFlag(flag: string) {
        let regex;

        switch(flag) {
            case "_ALL": regex = this._ALL; break;
            case "_ALLEXCDD": regex = this._ALLEXCDD; break;
        }

        return regex;
    }

    static hasWhitespace(value: string): boolean {
        const regex = new RegExp(/\s/);
        return regex.test(value);
    }

    static hasSpecialCharacters(value: string, flag: string): boolean {
        const regex = new RegExp( this.getRegexByFlag(flag) );
        return regex.test(value);
    }

    static hasLowerCase(value: string): boolean {
        return value.toUpperCase() !== value;
    }

    static hasUpperCase(value: string): boolean {
        return value.toLowerCase() !== value;
    }

    static hasNumbers(value: string): boolean {
        const regex = new RegExp(/\d/);
        return regex.test(value);
    }

    static isNumber(value: string): boolean {
        const regex = new RegExp(/^\d+$/);
        return regex.test(value);
    }
}
