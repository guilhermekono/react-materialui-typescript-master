import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { Button } from "@mui/material";

import { useDrawerContext } from "../shared/contexts";
import { Dashboard, ListagemDePessoas, DetalheDePessoas } from "../pages";


export const AppRoutes = () => {
    const {toggleDrawerOpen, setDrawerOptions} = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                label: 'Página inicial',
                icon:'home',
                path: '/pagina-inicial',
            },
            {
                label: 'Pessoas',
                icon:'people',
                path: '/pessoas',
            },
        ]);
    }, [])

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard/>}/>
            
            <Route path="/pessoas" element={<ListagemDePessoas/>} />
            <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas/>} />

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        
        </Routes>
    );
}