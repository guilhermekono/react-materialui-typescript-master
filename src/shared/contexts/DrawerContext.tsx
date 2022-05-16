import {createContext, useState, useCallback, useContext} from 'react';


interface IDrawerOption {
    icon: string;
    path: string;
    label: string;
}


interface IDrawerContextData {
    isDrawerOpen: boolean;
    drawerOptions: IDrawerOption[];
    toggleDrawerOpen: () => void;
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;

}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext)
}

interface Prips {
    children?: React.ReactNode;
}

export const DrawerProvider: React.FC<Prips> = ({children}) => {

    const [ isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [ drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

    const toggleDrawerOpen = useCallback(() => {setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)}, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {setDrawerOptions(newDrawerOptions)}, []); {/* essa função recebe por parÂmetro novas opções de menu */}

    
    return(
        <DrawerContext.Provider value = {{ setDrawerOptions: handleSetDrawerOptions, isDrawerOpen, drawerOptions, toggleDrawerOpen}}>
            {children}
        </DrawerContext.Provider>
    );

}


