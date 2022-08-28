import { FC, useState, useContext } from 'react'
import { Button, Input } from '../../../core/components';
import { useAppDispatch } from '../../../redux/hooks';
import { logIn } from '../../../features/user/userSlice';

import { ServiceContext } from '../../../core/contexts/ServiceProvider';

export type SignInData = {
    userNameOrEmail: string,
    password: string
}

const initialState: SignInData = {
    userNameOrEmail: "",
    password: "",
}

const SignInForm: FC = () => {
    const [userData, setUserData] = useState<SignInData>(initialState);
    const dispatch = useAppDispatch();

    const { userRouteService } = useContext(ServiceContext);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserData({ ...userData, [event.currentTarget.id]: event.currentTarget.value });
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
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
        <form>
            <Input
                className=""
                placeholder="Username / Email"
                label='Enter your username or email:'
                onChange={handleInputChange}
                type="text"
                value={userData.userNameOrEmail}
                id="userNameOrEmail"
            />
            <Input
                className=""
                placeholder="Password"
                onChange={handleInputChange}
                type="password"
                value={userData.password}
                label='Enter your password:'
                id="password"
            />
            <Button onClick={handleSubmit} label={"Sign in"} />
        </form>
    )
}

export default SignInForm;