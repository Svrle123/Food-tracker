import { FC, createContext, useContext, PropsWithChildren } from "react";
import { userRouteService, IUserRouteService } from "../services/UserRouteService";
import { foodRouteService, IFoodRouteService } from '../services/FoodRouteService';

interface IServices {
    userRouteService: IUserRouteService
    foodRouteService: IFoodRouteService
}

const services: IServices = {
    userRouteService: userRouteService,
    foodRouteService: foodRouteService,
}

export const ServiceContext = createContext<IServices>(services)

export const ServiceProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ServiceContext.Provider value={services}>
            {children}
        </ServiceContext.Provider>
    )
}

export const useService = () => useContext<IServices>(ServiceContext);