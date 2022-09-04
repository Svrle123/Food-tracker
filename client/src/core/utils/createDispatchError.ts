import { INotificationProps, IResponseError } from "../interfaces";

export default function createDispatchError(error: IResponseError): INotificationProps {
    let type: string;

    if (error.status < 500) {
        type = 'Warning';
    } else {
        type = 'Error';
    }

    return {
        type: type,
        message: error.message,
        timeStamp: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }
}