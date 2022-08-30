import React, { FC, useState, useContext } from 'react'
import { Button, Input } from '../../../core/components';
import { useAppDispatch } from '../../../store/hooks';
import { logIn } from '../../../features/user/userSlice';

import { ServiceContext } from '../../../core/contexts/ServiceProvider';
import { ISignInData } from '../interfaces/ISignInData';

type FormProps = {
    changeForm: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const initialState: ISignInData = {
    userNameOrEmail: '',
    password: '',
}

const SignInForm: FC<FormProps> = ({ changeForm }) => {
    const [userData, setUserData] = useState<ISignInData>(initialState);
    const dispatch = useAppDispatch();

    const { userRouteService } = useContext(ServiceContext);

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
                className=''
                placeholder='Username / Email'
                label='Enter your username or email:'
                onChange={handleInputChange}
                type='text'
                value={userData.userNameOrEmail}
                id='userNameOrEmail'
            />
            <Input
                className=''
                placeholder='Password'
                onChange={handleInputChange}
                type='password'
                value={userData.password}
                label='Enter your password:'
                id='password'
            />
            <button type='submit'>Log in</button>
            <Button onClick={(e) => changeForm(e)} label='Switch to Register' />
        </form>
    )
}

export default SignInForm;