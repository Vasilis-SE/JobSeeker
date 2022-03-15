import * as bcrypt from 'bcrypt';
import { UserGlobals } from '../interfaces/user';
import Validator from '../helpers/validator';

export default class Password {
    private password: string;

    constructor(p?: string) {
        this.password = p ? p : '';
    }

    hashPassword(): boolean {
        try {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(this.password, salt);
            this.setPassword(hash);

            return true;
        } catch (e) {
            return false;
        }
    }

    async comparePassword(plainPass = ''): Promise<boolean> {
        return await bcrypt.compare(plainPass, this.getPassword());
    }

    isPasswordLong(): boolean {
        return this.password.length >= UserGlobals.PASSWORD_MINLENGTH;
    }

    async isPasswordStrong() {
        let points = 0;

        if (Validator.hasLowerCase(this.password)) points++;
        if (Validator.hasUpperCase(this.password)) points++;
        if (Validator.hasNumbers(this.password)) points++;
        if (Validator.hasSpecialCharacters(this.password, '_ALL')) points++;
        if (this.isPasswordLong()) points++;

        return points >= 3;
    }

    // Getters - Setters
    getPassword(): string {
        return this.password;
    }

    setPassword(p: string): void {
        this.password = p;
    }
}
