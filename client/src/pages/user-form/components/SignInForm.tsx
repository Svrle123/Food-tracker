import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { Button, Input } from '../../../core/components';
import { useAppDispatch } from '../../../store/hooks';
import { login } from '../../../features/user/userSlice';

import { useService } from '../../../core/contexts/ServiceProvider';
import { ISignInData, IFormProps, IResponseError, ISignInValidation } from '../../../core/interfaces';
import { useNavigate } from 'react-router';
import { handleServerMessage } from '../../../core/utils';

import styles from './Form.module.css';

const initialFormState: ISignInData = {
    usernameOrEmail: '',
    password: '',
}

const initialValidationState: ISignInValidation = {
    isUsernameOrEmailInvalid: false,
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
            dispatch(login(response));
            navigate('/home');
        } catch (error: any) {
            formErrorHandler({ ...error.response.data, status: error.response.status });
        }
    }

    const formErrorHandler = (error: IResponseError): void => {
        switch (error.errorCode) {
            case (1000):
                setValidation({ ...validation, isUsernameOrEmailInvalid: true });
                handleServerMessage(error);
                break;
            case (1001):
                setValidation({ ...validation, isPasswordInvalid: true });
                handleServerMessage(error);
                break;
        }
    }

    return (
        <form className={styles.form__container} onSubmit={(e) => handleSubmit(e)}>
            <label
                className={styles.form__label}
                htmlFor={"usernameOrEmail"}
            >
                {"Enter your username or email:"}
            </label>
            <Input
                className={`${styles.form__input} ${validation.isUsernameOrEmailInvalid ? 'invalid' : ''}`}
                placeholder='Username / Email'
                onChange={handleInputChange}
                value={userData.usernameOrEmail}
                required={true}
                type='text'
                id='usernameOrEmail'
            />
            <label
                className={styles.form__label}
                htmlFor={"password"}
            >
                {"Enter your password:"}
            </label>
            <Input
                className={`${styles.form__input} ${validation.isPasswordInvalid ? 'invalid' : ''}`}
                placeholder='Password'
                onChange={handleInputChange}
                value={userData.password}
                required={true}
                type='password'
                id='password'
            />
            <Button
                variant={'contained'}
                label='Sign in'
                type='submit'
            />
            <Button
                variant={'contained'}
                onClick={(e) => changeForm(e)}
                label='Switch to Sign up' />
        </form>
    )
}

export default SignInForm;