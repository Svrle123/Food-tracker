import React, { FC, useState, useContext } from 'react'
import { Button, Input } from '../../../core/components'
import { ServiceContext } from '../../../core/contexts/ServiceProvider';
import { ISignUpData } from '../interfaces/ISignUpData';

type FormProps = {
  changeForm: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const initialState: ISignUpData = {
  userName: '',
  password: '',
  isAdmin: false,
  email: '',
  name: '',
  confirmPassword: ''
}

const SignUpForm: FC<FormProps> = ({ changeForm }) => {
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
      <Input className='form__input' id='name' type='text' placeholder='Enter full name' onChange={(e) => handleInputChange(e)} value={formValues.name} label='Full name' />
      <Input className='form__input' id='userName' type='text' placeholder='Enter username' onChange={(e) => handleInputChange(e)} value={formValues.userName} label='Username' />
      <Input className='form__input' id='email' type='email' placeholder='Enter email' onChange={(e) => handleInputChange(e)} value={formValues.email} label='Email' />
      <Input className='form__input' id='password' type='password' placeholder='Enter password' onChange={(e) => handleInputChange(e)} value={formValues.password} label='Password' />
      <Input className='form__input' id='confirmPassword' type='password' placeholder='Confirm password' onChange={(e) => handleInputChange(e)} value={formValues.confirmPassword} label='Confirm password' />
      <button type='submit'>Register</button>
      <Button onClick={(e) => changeForm(e)} label='Switch to Log in' />
    </form>
  )
}

export default SignUpForm