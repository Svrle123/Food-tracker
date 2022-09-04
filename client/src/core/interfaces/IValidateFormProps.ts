import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { SetStateAction, Dispatch as ReactDispatch } from "react";
import { ISignUpData, ISignUpValidation, IStore } from ".";

export default interface IValidateFormProps {
    formValues: ISignUpData,
    dispatch: ThunkDispatch<IStore, undefined, AnyAction> & Dispatch<AnyAction>,
    setValidation: ReactDispatch<SetStateAction<ISignUpValidation>>
}