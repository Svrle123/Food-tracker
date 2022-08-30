import React, { FC, useState } from 'react'
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

const RegisterLogin: FC = () => {
    const [isLogIn, setIsLogIn] = useState<boolean>(true);

    const handleFormChange = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        setIsLogIn(!isLogIn);
    }

    return (
        <React.Fragment>
            {isLogIn ?
                <SignInForm changeForm={handleFormChange} />
                :
                <SignUpForm changeForm={handleFormChange} />
            }
        </React.Fragment>
    )
}

export default RegisterLogin