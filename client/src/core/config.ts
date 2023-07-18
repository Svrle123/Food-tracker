import HomeIcon from '@mui/icons-material/Home';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { SvgIconComponent } from "@mui/icons-material";

type Route = {
    title: string,
    route: string,
    icon: SvgIconComponent
}

const routes: Route[] = [
    {
        title: "Home",
        route: "/home",
        icon: HomeIcon
    },
    {
        title: "Summary",
        route: "/summary",
        icon: SummarizeIcon
    }
]

export default routes;