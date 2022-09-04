import React, { FC, useState, useContext } from 'react'
import { Button, Input } from '../../../core/components';
import { useAppDispatch } from '../../../store/hooks';
import { logIn } from '../../../features/user/userSlice';

import { useService } from '../../../core/contexts/ServiceProvider';
import { ISignInData, IFormProps } from '../../../core/interfaces';

const initialState: ISignInData = {
    userNameOrEmail: '',
    password: '',
}

const SignInForm: FC<IFormProps> = ({ changeForm }) => {
    const [userData, setUserData] = useState<ISignInData>(initialState);
    const { userRouteService } = useService();
    const dispatch = useAppDispatch();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserData({ ...userData, [event.currentTarget.id]: event.currentTarget.value });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const response = await userRouteService.signIn(userData);
            dispatch(logIn(response));
        } catch (error) {
            console.log(error);
        }
        setUserData(initialState);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Input
                className='user__form__input'
                placeholder='Username / Email'
                onChange={handleInputChange}
                value={userData.userNameOrEmail}
                label='Enter your username or email:'
                type='text'
                id='userNameOrEmail'
            />
            <Input
                className='user__form__input'
                placeholder='Password'
                onChange={handleInputChange}
                value={userData.password}
                label='Enter your password:'
                type='password'
                id='password'
            />
            <button className='user__form__button' type='submit'>Log in</button>
            <Button
                className='user__form__button'
                onClick={(e) => changeForm(e)}
                label='Switch to Register' />
        </form>
    )
}

export default SignInForm;