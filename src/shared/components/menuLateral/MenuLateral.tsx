import { Avatar, Divider, Drawer, List, ListItemIcon, ListItemButton, ListItemText, useTheme, Icon, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system";
import { useDrawerContext } from "../../contexts";



interface Props {
    children?: React.ReactNode;
}

export const MenuLateral: React.FC<Props> = ({children}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const {isDrawerOpen, toggleDrawerOpen} = useDrawerContext();

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
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon>home</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Página inicial"/>

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

