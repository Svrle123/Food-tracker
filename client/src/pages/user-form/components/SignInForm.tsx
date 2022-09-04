import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { Button, Input } from '../../../core/components';
import { useAppDispatch } from '../../../store/hooks';
import { logIn } from '../../../features/user/userSlice';
import { clearAndSetError } from '../../../features/error/errorSlice';

import { useService } from '../../../core/contexts/ServiceProvider';
import { ISignInData, IFormProps, IResponseError, ISignInValidation } from '../../../core/interfaces';
import { useNavigate } from 'react-router';
import { createDispatchError } from '../../../core/utils';

const initialFormState: ISignInData = {
    userNameOrEmail: '',
    password: '',
}

const initialValidationState: ISignInValidation = {
    isUserNameOrEmailInvalid: false,
    isPasswordInvalid: false,
}

const SignInForm: FC<IFormProps> = ({ changeForm }) => {
    const [userData, setUserData] = useState<ISignInData>(initialFormState);
    const [validation, setValidation] = useState<ISignInValidation>(initialValidationState)

    const { userRouteService } = useService();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setValidation(initialValidationState);
        setUserData({ ...userData, [event.currentTarget.id]: event.currentTarget.value });
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const response = await userRouteService.signIn(userData);
            dispatch(logIn(response));
            navigate('/home');
        } catch (error: any) {
            formErrorHandler({ ...error.response.data, status: error.response.status });
        }
    }

    const formErrorHandler = (error: IResponseError): void => {
        switch (error.errorCode) {
            case (1000):
                setValidation({ ...validation, isUserNameOrEmailInvalid: true });
                dispatch(clearAndSetError(createDispatchError(error)));
                break;
            case (1001):
                setValidation({ ...validation, isPasswordInvalid: true });
                dispatch(clearAndSetError(createDispatchError(error)));
                break;
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Input
                className={`user__form__input ${validation.isUserNameOrEmailInvalid ? 'invalid' : ''}`}
                placeholder='Username / Email'
                onChange={handleInputChange}
                value={userData.userNameOrEmail}
                label='Enter your username or email:'
                type='text'
                id='userNameOrEmail'
            />
            <Input
                className={`user__form__input ${validation.isPasswordInvalid ? 'invalid' : ''}`}
                placeholder='Password'
                onChange={handleInputChange}
                value={userData.password}
                label='Enter your password:'
                type='password'
                id='password'
            />
            <Button className='user__form__button' type='submit' label='Log in' />
            <Button
                className='user__form__button'
                onClick={(e) => changeForm(e)}
                label='Switch to Register' />
        </form>
    )
}

export default SignInForm;