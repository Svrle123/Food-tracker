import React, { FC, useState } from 'react'
import Navbar from '../../core/components/Navbar';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

const RegisterLogin: FC = () => {
    const [isLogIn, setIsLogIn] = useState<boolean>(true);

    const handleFormChange = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        setIsLogIn(!isLogIn);
    }

    return (
        <div className='form__container'>
            <div className='user__form'>
                {isLogIn ?
                    <SignInForm changeForm={handleFormChange} />
                    :
                    <SignUpForm changeForm={handleFormChange} />
                }
            </div>
        </div>
    )
}

export default RegisterLogin