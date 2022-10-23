import { IResponseError } from "../interfaces";
import { toast } from 'react-toastify';


export default function handleServerMessage(error: IResponseError): void {
    const toastifyProps: Object = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    if (error.status >= 500) {
        toast.error(error.message, toastifyProps)
    }
    else if (error.status < 500 && error.status >= 400) {
        toast.warning(error.message, toastifyProps)
    }
    else if (error.status <= 300) {
        toast.info(error.message, toastifyProps)
    }
}