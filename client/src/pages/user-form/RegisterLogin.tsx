import { FC, useState, MouseEvent, FormEvent } from 'react'
import { SignInForm, SignUpForm } from './components';
import styles from './RegisterLogin.module.css';
import logo from '../../core/images/logo.png';

const RegisterLogin: FC = () => {
    const [isLogIn, setIsLogIn] = useState<boolean>(true);

    const handleFormChange = (event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setIsLogIn(!isLogIn);
    }

    return (
        <>
            <div className={styles.container__offset}>
                <div className={`${styles.main__container} ${styles.left}`}>
                    <div className={styles.grid__container}>
                        <div className={styles.heading}>
                            <h1>FOOD TRACKER</h1>
                        </div>
                        <div className={styles.container__center}>
                            <img src={logo} />
                        </div>
                    </div>
                    <div className={`${styles.main__container} ${styles.right}`}>
                        <div className={styles.container__center}>
                            {isLogIn ?
                                <SignInForm changeForm={handleFormChange} />
                                :
                                <SignUpForm changeForm={handleFormChange} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterLogin;