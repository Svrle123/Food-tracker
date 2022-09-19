import { IValidateFormProps } from "../interfaces";
import handleServerMessage from "./handleServerMessage";
import { initialValidationState } from '../../pages/user-form/components/SignUpForm';

export const validateRegisterForm = ({ formValues, setValidation }: IValidateFormProps): boolean => {
    const { name, email, password, confirmPassword } = formValues;
    const nameRegex = new RegExp(/^[a-zA-Z\s]+$/);
    const emailRegex = new RegExp(/\S+@\S+\.\S+/);

    if (!nameRegex.test(name)) {
        handleServerMessage({
            status: 400,
            message: 'Name must contain only letters!',
        });
        setValidation({ ...initialValidationState, isNameInvalid: true });

        return false;
    } else if (!emailRegex.test(email)) {
        handleServerMessage({
            status: 400,
            message: 'Invalid email format!',
        });
        setValidation({ ...initialValidationState, isEmailInvalid: true });

        return false;
    } else if (password !== confirmPassword) {
        handleServerMessage({
            status: 400,
            message: 'Passwords do not match!',
        });
        setValidation({ ...initialValidationState, isPasswordInvalid: true });

        return false;
    }

    return true;
}

export default validateRegisterForm;