import React, { FC, useEffect, useState } from 'react'
import { INotificationProps } from './interfaces/INotificationProps'

const Notification: FC<INotificationProps> = ({ type, message, timeStamp }) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, 3000)

        return (() => {
            setIsVisible(false);
            clearTimeout(timeout);
        })
    }, [])

    return (
        <React.Fragment>
            {isVisible &&
                <div className='notification__wrap'>
                    <div className={`notification__${type}`}>
                        <span className='notification__item notification__type'>{type}</span>
                        <span className='notification__item notification__message'>{message}</span>
                        <span className='notification__item notification__timeStamp'>{timeStamp}</span>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default Notification