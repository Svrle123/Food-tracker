import React, { FC, useState, useContext } from 'react'
import { Button, Input } from '../../../core/components'
import { ServiceContext } from '../../../core/contexts/ServiceProvider';
import { ISignUpData, IFormProps } from '../../../core/interfaces';

const initialState: ISignUpData = {
  userName: '',
  password: '',
  isAdmin: false,
  email: '',
  name: '',
  confirmPassword: ''
}

const SignUpForm: FC<IFormProps> = ({ changeForm }) => {
  const [formValues, setFormValues] = useState<ISignUpData>(initialState)
  const { userRouteService } = useContext(ServiceContext)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormValues({ ...formValues, [event.currentTarget.id]: event.currentTarget.value });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (formValues.password !== formValues.confirmPassword) {
      return
      //implement pop up toast message
    }

    const { confirmPassword, ...user } = formValues;

    try {
      await userRouteService.signUp(user);
      //switch to log-in form
    } catch (error) {
      console.log(error);
      //implement pop up toast message
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Input
        className='user__form__input'
        placeholder='Enter full name'
        onChange={(e) => handleInputChange(e)}
        value={formValues.name}
        label='Full name'
        type='text'
        id='name'
      />
      <Input
        className='user__form__input'
        placeholder='Enter username'
        onChange={(e) => handleInputChange(e)}
        value={formValues.userName}
        label='Username'
        type='text'
        id='userName'
      />
      <Input
        className='user__form__input'
        placeholder='Enter email'
        onChange={(e) => handleInputChange(e)}
        value={formValues.email}
        label='Email'
        type='email'
        id='email'
      />
      <Input
        className='user__form__input'
        placeholder='Enter password'
        onChange={(e) => handleInputChange(e)}
        value={formValues.password}
        type='password'
        label='Password'
        id='password'
      />
      <Input
        className='user__form__input'
        placeholder='Confirm password'
        onChange={(e) => handleInputChange(e)}
        value={formValues.confirmPassword}
        label='Confirm password'
        type='password'
        id='confirmPassword'
      />
      <button className='user__form__button' type='submit'>Register</button>
      <Button
        className='user__form__button'
        onClick={(e) => changeForm(e)}
        label='Switch to Log in'
      />
    </form>
  )
}

export default SignUpForm