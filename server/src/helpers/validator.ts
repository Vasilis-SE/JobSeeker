enum _FORBIDDENCHARS {
    _ALL = `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/`, // All special chars
    _ALLEXCDD = `/[!@#$%^&*()_+\=\[\]{};':"\\|<>\/?]+/`, // All except dashes, dots and commas
}

export default class Validator {
    static hasWhitespace(value: string): boolean {
        const regex = new RegExp(/\s/);
        return regex.test(value);
    }

    static hasSpecialCharacters(value: string, flag: string): boolean {
        let regExpression = flag ? _FORBIDDENCHARS._ALL : _FORBIDDENCHARS[flag];
        const regex = new RegExp(regExpression);
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
