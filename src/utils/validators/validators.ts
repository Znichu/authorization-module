import * as yup from "yup";

export const schemaSignInForm = yup.object().shape({
    email: yup.string().required().min(2),
    password: yup.string().required().min(8),
});

export const schemaRegisterForm = yup.object().shape({
    email: yup.string().email().required().min(7),
    password: yup.string().required().min(8),
    passwordConfirmation: yup.string().required().label('Confirm password')
        .test('passwordConfirmation', 'Passwords must match!', function (value) {
            return this.parent.password === value;
        })
});

export const schemaForgotPage = yup.object().shape({
    email: yup.string().email().required(),
});

export const schemaSetNewPassForm = yup.object().shape({
    password: yup.string().required().min(8),
    passwordConfirmation: yup.string().required()
        .test('passwordConfirmation', 'Passwords must match!', function (value) {
            return this.parent.password === value;
        })
});

export const schemaAddNewCardPackForm = yup.object().shape({
    name: yup.string().min(2, `Require more or 2 letter`).max(50, `Require less or 50 letters`),
    path:  yup.string().min(2, `Require more or 2 symbols`),
    shots:  yup.number().min(0, `Require more or equal 0`),
    rating:  yup.number().min(0,  `Require more or equal 0`),
    deckCover:  yup.string().min(4,  `Require more or 4 letters`),
    type:  yup.string().min(2, `Require more or 2 letters`),
});