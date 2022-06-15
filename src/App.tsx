import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { LightTheme } from "./shared/themes";
import { AppThemeProvider, DrawerProvider} from './shared/contexts'
import { MenuLateral } from "./shared/components/menuLateral/MenuLateral";
import './shared/form/TraducoesYUP'



export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
            <MenuLateral>
              <AppRoutes/>
            </MenuLateral>
            
          
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
}

