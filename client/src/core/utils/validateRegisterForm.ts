import { IValidateFormProps } from "../interfaces";
import { clearAndSetError } from "../../features/error/errorSlice";
import createDispatchError from "./createDispatchError";
import { initialValidationState } from './../../pages/user-form/components/SignUpForm'

export const validateForm = ({ formValues, dispatch, setValidation }: IValidateFormProps): boolean => {
    const { name, email, password, confirmPassword } = formValues;
    const nameRegex = new RegExp(/^[a-zA-Z\s]+$/);
    const emailRegex = new RegExp(/\S+@\S+\.\S+/);

    if (!nameRegex.test(name)) {
        dispatch(clearAndSetError(createDispatchError({
            status: 400,
            message: 'Name must contain only letters!',
        })));
        setValidation({ ...initialValidationState, isNameInvalid: true });

        return false;
    } else if (!emailRegex.test(email)) {
        dispatch(clearAndSetError(createDispatchError({
            status: 400,
            message: 'Invalid email format!',
        })));
        setValidation({ ...initialValidationState, isEmailInvalid: true });

        return false;
    } else if (password !== confirmPassword) {
        dispatch(clearAndSetError(createDispatchError({
            status: 400,
            message: 'Passwords do not match!',
        })));
        setValidation({ ...initialValidationState, isPasswordInvalid: true });


        return false;
    }


    return true;
}

export default validateForm;