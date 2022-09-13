import { FC, createContext, useContext, PropsWithChildren } from "react";
import { userRouteService, IUserRouteService } from "../services/UserRouteService";
import { foodRouteService, IFoodRouteService } from '../services/FoodRouteService';
import { foodLogRouteService, IFoodLogRouteService } from "../services/FoodLogRouteService";

interface IServices {
    userRouteService: IUserRouteService
    foodRouteService: IFoodRouteService
    foodLogRouteService: IFoodLogRouteService
}

const services: IServices = {
    userRouteService: userRouteService,
    foodRouteService: foodRouteService,
    foodLogRouteService: foodLogRouteService,
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