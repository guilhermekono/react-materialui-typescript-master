import { BrowserRouter } from "react-router-dom";
import { Button } from "@mui/material";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { Dashboard } from "../pages";
import { ListagemDePessoas } from "../pages";


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
            <Route path="/pessoas/detalhe/:id" element={<p>Detalhe</p>} />

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        
        </Routes>
    );
}