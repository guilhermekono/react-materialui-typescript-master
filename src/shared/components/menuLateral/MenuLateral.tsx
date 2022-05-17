import { Avatar, Divider, Drawer, List, ListItemIcon, ListItemButton, ListItemText, useTheme, Icon, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useAppThemeContext, useDrawerContext } from "../../contexts";


interface IListItemLinkProps {
    label: string;
    icon: string;
    to: string;
    onClick: (() => void) | undefined;
}


const ListItemLink: React.FC<IListItemLinkProps> = ({ label, icon, to, onClick }) => {
    
    const navigate = useNavigate();


    const resolvedPath = useResolvedPath(to);

    const match = useMatch({ path: resolvedPath.pathname, end: false})


    const handleClick = () => {
        navigate(to);
        onClick?.();  {/* Essa função é undefined? se sim, não faz nada */}
    }
    
    
    return(
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>

                <Icon>{icon}</Icon>

            </ListItemIcon>
            <ListItemText primary={label}/>
        </ListItemButton>
    )
}

interface Props {
    children?: React.ReactNode;
}

export const MenuLateral: React.FC<Props> = ({children}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const {isDrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext();

    const {toggleTheme} = useAppThemeContext();

    return (
        <>
            <Drawer open={isDrawerOpen}  onClose={ toggleDrawerOpen } variant={smDown ? 'temporary' : 'permanent'}>
                <Box width={theme.spacing(28)} height={theme.spacing(28)} display="flex" flexDirection="column">

                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                        <Avatar sx={{ height: theme.spacing(12), width: theme.spacing(12) }}   src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.esa.int%2FScience_Exploration%2FSpace_Science%2FSolar_Orbiter%2FZooming_into_the_Sun_with_Solar_Orbiter&psig=AOvVaw2iA-YmKaNdnZHh2_s9PxW7&ust=1652745702251000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCLjWg9fb4vcCFQAAAAAdAAAAABAD"/>
                    </Box>


                </Box>

                <Divider/>

                <Box flex={1}>
                    <List component="nav">
                        {drawerOptions.map(drawerOption => (
                            <ListItemLink 
                                to={drawerOption.path}
                                key={drawerOption.path} 
                                icon={drawerOption.icon}   
                                label={drawerOption.label} 
                                onClick={smDown ? toggleDrawerOpen : undefined} 
                            />
                        ))}
                    </List>
                </Box>
                <Box>
                    <List component="nav">
                        <ListItemButton onClick={toggleTheme}>
                            <ListItemIcon>

                                <Icon>dark_mode</Icon>

                            </ListItemIcon>
                            <ListItemText primary="Alternar Tema"/>
                        </ListItemButton>
                    </List>
                </Box>

            </Drawer>
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}> {/* Esse 28 é medida própria, cada unidade retorna 4 pixeis, ou seja, está retornando 28*4*/ } 
                {children}
            </Box>
        </>

    )

}

