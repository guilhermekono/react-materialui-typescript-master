import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { LightTheme } from "./shared/themes";
import { AppThemeProvider} from './shared/contexts/ThemeContext'
import { MenuLateral } from "./shared/components/menuLateral/MenuLateral";

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
          <MenuLateral>
            <AppRoutes/>
          </MenuLateral>
          
        
      </BrowserRouter>
    </AppThemeProvider>
  );
}

