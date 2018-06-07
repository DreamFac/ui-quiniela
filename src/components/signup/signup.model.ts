export interface SignUp {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export const InitalState: SignUp = {
    email: '',
    password: '',
    passwordConfirmation: ''
};

export class SignUpModel {
    email;
    password;
    passwordConfirmation;
    constructor(model: SignUp = InitalState) {
        this.email = model.email;
        this.password = model.password;
        this.passwordConfirmation = model.passwordConfirmation;
    }
}