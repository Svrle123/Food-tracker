import React, { FC, useState } from 'react'
import { SignInForm, SignUpForm } from './';

const RegisterLogin: FC = () => {
    const [isLogIn, setIsLogIn] = useState<boolean>(true);

    const handleFormChange = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        setIsLogIn(!isLogIn);
    }

    return (
        <div className='user__form__container'>
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