import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Button, Input } from '../../../core/components';
import { useService } from '../../../core/contexts/ServiceProvider';
import { ISignUpData, IFormProps, ISignUpValidation, IResponseError } from '../../../core/interfaces';
import { createDispatchError, validateRegisterForm } from '../../../core/utils';
import { clearAndSetError } from '../../../features/error/errorSlice';
import { useAppDispatch } from '../../../store/hooks';

const initialState: ISignUpData = {
  userName: '',
  password: '',
  isAdmin: false,
  email: '',
  name: '',
  confirmPassword: ''
};

export const initialValidationState: ISignUpValidation = {
  isUserNameInvalid: false,
  isNameInvalid: false,
  isEmailInvalid: false,
  isPasswordInvalid: false,
}

const SignUpForm: FC<IFormProps> = ({ changeForm }) => {
  const [formValues, setFormValues] = useState<ISignUpData>(initialState);
  const [validation, setValidation] = useState<ISignUpValidation>(initialValidationState)

  const { userRouteService } = useService();
  const dispatch = useAppDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValidation(initialValidationState);
    setFormValues({ ...formValues, [event.currentTarget.id]: event.currentTarget.value });
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (!validateRegisterForm({ formValues, dispatch, setValidation })) {
      return;
    }

    const { confirmPassword, ...user } = formValues;

    try {
      await userRouteService.signUp(user);
      changeForm(event);
    } catch (error: any) {
      formErrorHandler({ ...error.response.data, status: error.response.status });
    }
  }

  const formErrorHandler = (error: IResponseError): void => {
    switch (error.errorCode) {
      case (1002):
        setValidation({ ...validation, isEmailInvalid: true });
        dispatch(clearAndSetError(createDispatchError(error)));
        break;
      case (1003):
        setValidation({ ...validation, isUserNameInvalid: true });
        dispatch(clearAndSetError(createDispatchError(error)));
        break;
    }
  }


  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Input
        className={`user__form__input ${validation.isNameInvalid ? 'invalid' : ''}`}
        placeholder='Enter full name'
        onChange={(e) => handleInputChange(e)}
        required={true}
        value={formValues.name}
        label='Full name'
        type='text'
        id='name'
      />
      <Input
        className={`user__form__input ${validation.isUserNameInvalid ? 'invalid' : ''}`}
        placeholder='Enter username'
        onChange={(e) => handleInputChange(e)}
        required={true}
        value={formValues.userName}
        label='Username'
        type='text'
        id='userName'
      />
      <Input
        className={`user__form__input ${validation.isEmailInvalid ? 'invalid' : ''}`}
        placeholder='Enter email'
        onChange={(e) => handleInputChange(e)}
        required={true}
        value={formValues.email}
        label='Email'
        type='text'
        id='email'
      />
      <Input
        className='user__form__input'
        placeholder='Enter password'
        onChange={(e) => handleInputChange(e)}
        required={true}
        value={formValues.password}
        type='password'
        label='Password'
        id='password'
      />
      <Input
        className={`user__form__input ${validation.isPasswordInvalid ? 'invalid' : ''}`}
        placeholder='Confirm password'
        onChange={(e) => handleInputChange(e)}
        required={true}
        value={formValues.confirmPassword}
        label='Confirm password'
        type='password'
        id='confirmPassword'
      />
      <Button
        className='user__form__button'
        type='submit'
        label='Sign up'
      />
      <Button
        className='user__form__button'
        onClick={(e) => changeForm(e)}
        label='Switch to Sign in'
      />
    </form>
  )
}

export default SignUpForm