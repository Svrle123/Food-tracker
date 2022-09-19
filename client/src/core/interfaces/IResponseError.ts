export default interface IResponseError {
    [key: string]: any,
    message: string,
    errorCode?: number,
    status: number
}