import Validator from "../../src/helpers/validator";
import { UserGlobals } from "../../src/interfaces/user";

describe('Check hasWhitespace function', () => {
    test('Single white space in middle found', () => {
        const response = Validator.hasWhitespace('Some text');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });

    test('Single white space at the beginning found', () => {
        const response = Validator.hasWhitespace(' text');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });

    test('Single white space at the end found', () => {
        const response = Validator.hasWhitespace('text ');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });

    test('Text with no whitespace', () => {
        const response = Validator.hasWhitespace('text');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });

    test('Multiple white spaces found', () => {
        const response = Validator.hasWhitespace('some text here');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });
});

describe('Check hasSpecialCharacters function', () => {
    test('Text has special characters', () => {
        const response = Validator.hasWhitespace('Some text%#)@');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });

    test('Text has no special characters', () => {
        const response = Validator.hasWhitespace('text');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });
});

describe('Check hasLowerCase function', () => {
    test('Text with lower case should return true', () => {
        const response = Validator.hasLowerCase('aneM53aIL');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });

    test('Text without lower case should return false', () => {
        const response = Validator.hasLowerCase('ANEM53AIL');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });

    test('Empty input should return false', () => {
        const response = Validator.hasLowerCase('');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });
});

describe('Check hasUpperCase function', () => {
    test('Text with upper case should return true', () => {
        const response = Validator.hasUpperCase('aneM53aIL');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });

    test('Text without upper case should return false', () => {
        const response = Validator.hasUpperCase('anemail');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });

    test('Empty input should return false', () => {
        const response = Validator.hasUpperCase('');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });
});

describe('Check hasNumbers function', () => {
    test('Text with numbers should return true', () => {
        const response = Validator.hasNumbers('aneM53aIL');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });

    test('Text without numbers should return false', () => {
        const response = Validator.hasNumbers('aneMaIL');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });

    test('Empty input should return false', () => {
        const response = Validator.hasNumbers('');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });
});

describe('Check isNumber function', () => {
    test('Text that contains only numbers should return true', () => {
        const response = Validator.isNumber('482473298');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });

    test('Text that does not contains only numbers should return false', () => {
        const response = Validator.isNumber('aneM234aIL');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });

    test('Empty input should return false', () => {
        const response = Validator.isNumber('');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });
});