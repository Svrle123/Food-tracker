import React, { FC, useEffect } from 'react'
import { clearError } from '../../features/error/errorSlice';
import { useAppDispatch } from '../../store/hooks'
import { INotificationProps } from '../interfaces'

const Notification: FC<INotificationProps> = ({ type, message, timeStamp }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(clearError());
        }, 3000)

        return (() => {
            clearTimeout(timeout);
        })
    }, [])

    return (
        <React.Fragment>
            <div className='notification__wrap'>
                <div className={`notification__${type}`}>
                    <span className='notification__item notification__type'>{type}</span>
                    <span className='notification__item notification__message'>{message}</span>
                    <span className='notification__item notification__timeStamp'>{timeStamp}</span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Notification;