import { FC, ReactNode, createContext } from "react";
import { userRouteService, IUserRouteService } from "../services/UserRouteService";
import { foodRouteService, IFoodRouteService } from '../services/FoodRouteService';

interface IServices {
    userRouteService: IUserRouteService
    foodRouteService: IFoodRouteService
}

type ServiceProviderProps = {
    children: ReactNode
}

const services: IServices = {
    userRouteService: userRouteService,
    foodRouteService: foodRouteService,
}

export const ServiceContext = createContext<IServices>(services)

export const ServiceProvider: FC<ServiceProviderProps> = ({ children }) => {
    return (
        <ServiceContext.Provider value={services}>
            {children}
        </ServiceContext.Provider>
    )
}