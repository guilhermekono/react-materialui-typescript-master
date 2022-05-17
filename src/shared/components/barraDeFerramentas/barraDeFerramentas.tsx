import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";


interface IBarraDeFerramentasProps {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}

export const BarraDeFerramentas: React.FC<IBarraDeFerramentasProps> = ({textoDaBusca = '', mostrarInputBusca=false, aoMudarTextDeBusca, aoClicarEmNovo, textoBotaoNovo = "Novo", mostrarBotaoNovo="true",}) => {

    const theme = useTheme();

    return (
        <Box 
            height={theme.spacing(5)} 
            marginX={1} 
            padding={1} 
            paddingX={2} 
            display="flex" /* display flex faz com que se comporte como linha, os itens ficam alinhados em linha, ao invés de coluna */
            gap={1} 
            component={Paper}
        >

            {mostrarInputBusca && (
                <TextField 
                size="small"
                value={textoDaBusca}
                onChange={(e) => aoMudarTextDeBusca?.(e.target.value)}
                placeholder="Pesquisar..."
            />
            )}

            <Box flex={1} display="flex" justifyContent="end" >
                {mostrarBotaoNovo &&(
                    <Button
                    color="primary"
                    disableElevation
                    variant="contained"
                    onClick={aoClicarEmNovo}
                    endIcon={<Icon>add</Icon>}
                    > {textoBotaoNovo}</Button>
                )}
            </Box>
        </Box>
    );

}
