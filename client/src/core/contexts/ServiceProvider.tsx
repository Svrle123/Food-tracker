import { FC, ReactNode, createContext } from "react";
import { userRouteService, RouteService } from "../services/UserRouteService";

interface IServices {
    userRouteService: RouteService
}

type ServiceProviderProps = {
    children: ReactNode
}

const services: IServices = {
    userRouteService: userRouteService,
}

export const ServiceContext = createContext<IServices>(services)

export const ServiceProvider: FC<ServiceProviderProps> = ({ children }) => {
    return (
        <ServiceContext.Provider value={services}>
            {children}
        </ServiceContext.Provider>
    )
}