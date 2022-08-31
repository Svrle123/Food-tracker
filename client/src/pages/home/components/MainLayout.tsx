import { FC, useContext, useEffect, useState } from 'react'
import { IFood } from '../../../core/components/interfaces/IFood';
import Table from '../../../core/components/Table';
import { ServiceContext } from '../../../core/contexts/ServiceProvider';


const MainLayout: FC = () => {
    const [data, setData] = useState<IFood[]>([]);
    const { foodRouteService } = useContext(ServiceContext)

    useEffect(() => {
        const initData = async () => {
            const response = await foodRouteService.get({ page: 1, rpp: 15 });
            setData(response.data);
        }
        initData();
    }, [])

    return (
        <>
            {data.length > 0 &&
                <Table {...data} />
            }
        </>
    )
}

export default MainLayout;