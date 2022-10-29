import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Button, Input } from '../../../core/components';
import { useService } from '../../../core/contexts/ServiceProvider';
import { ISignUpData, IFormProps, ISignUpValidation, IResponseError } from '../../../core/interfaces';
import { handleServerMessage, validateRegisterForm } from '../../../core/utils';
import { useAppDispatch } from '../../../store/hooks';

import styles from './Form.module.css';

const initialState: ISignUpData = {
  userName: '',
  password: '',
  isAdmin: false,
  email: '',
  name: '',
  confirmPassword: '',
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
        handleServerMessage(error);
        break;
      case (1003):
        setValidation({ ...validation, isUserNameInvalid: true });
        handleServerMessage(error);
        break;
    }
  }


  return (
    <form className={styles.form__container} onSubmit={(e) => handleSubmit(e)}>
      <label
        className={styles.form__label}
        htmlFor={"name"}
      >
        {"Enter first and last name:"}
      </label>
      <Input
        className={`${styles.form__input} ${validation.isNameInvalid ? 'invalid' : ''}`}
        placeholder='Enter full name'
        onChange={(e) => handleInputChange(e)}
        required={true}
        value={formValues.name}
        type='text'
        id='name'
      />
      <label
        className={styles.form__label}
        htmlFor={"userName"}
      >
        {"Enter your username:"}
      </label>
      <Input
        className={`${styles.form__input} ${validation.isUserNameInvalid ? 'invalid' : ''}`}
        placeholder='Enter username'
        onChange={(e) => handleInputChange(e)}
        required={true}
        value={formValues.userName}
        type='text'
        id='userName'
      />
      <label
        className={styles.form__label}
        htmlFor={"email"}
      >
        {"Enter your email:"}
      </label>
      <Input
        className={`${styles.form__input} ${validation.isEmailInvalid ? 'invalid' : ''}`}
        placeholder='Enter email'
        onChange={(e) => handleInputChange(e)}
        required={true}
        value={formValues.email}
        type='text'
        id='email'
      />
      <label
        className={styles.form__label}
        htmlFor={"password"}
      >
        {"Enter your password:"}
      </label>
      <Input
        className={styles.form__input}
        placeholder='Enter password'
        onChange={(e) => handleInputChange(e)}
        required={true}
        value={formValues.password}
        type='password'
        id='password'
      />
      <label
        className={styles.form__label}
        htmlFor={"confirmPassword"}
      >
        {"Confirm your password:"}
      </label>
      <Input
        className={`${styles.form__input} ${validation.isPasswordInvalid ? 'invalid' : ''}`}
        placeholder='Confirm password'
        onChange={(e) => handleInputChange(e)}
        required={true}
        value={formValues.confirmPassword}
        type='password'
        id='confirmPassword'
      />
      <Button
        variant={'contained'}
        label='Sign up'
        type='submit'
      />
      <Button
        variant={'contained'}
        onClick={(e) => changeForm(e)}
        label='Switch to Sign in'
      />
    </form>
  )
}

export default SignUpForm