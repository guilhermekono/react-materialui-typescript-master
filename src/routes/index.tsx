import { BrowserRouter } from "react-router-dom";
import { Button } from "@mui/material";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";


export const AppRoutes = () => {
    const {toggleDrawerOpen, setDrawerOptions} = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                label: 'Página inicial',
                icon:'home',
                path: '/pagina-inicial',
            }
        ]);
    }, [])

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Button variant='contained' color = 'primary' onClick={toggleDrawerOpen}>Toggle Drawer</Button>}/>

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        
        </Routes>
    );
}