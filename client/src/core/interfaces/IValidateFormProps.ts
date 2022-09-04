import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { ISignUpData, ISignUpValidation, IStore } from ".";

export default interface IValidateFormProps {
    formValues: ISignUpData,
    dispatch: ThunkDispatch<IStore, undefined, AnyAction> & Dispatch<AnyAction>,
    setValidation: React.Dispatch<React.SetStateAction<ISignUpValidation>>
}