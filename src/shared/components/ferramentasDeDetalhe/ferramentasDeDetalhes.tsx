import {Box, Button, Divider, Icon, Paper, useTheme} from '@mui/material';

interface IFerramentasDeDetalheProps{
    textoBotaoNovo
}

export const FerramentasDeDetalhe: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            height={theme.spacing(5)}
            marginX={1}
            padding={1}
            paddingX={2}
            display="flex" /* display flex faz com que se comporte como linha, os itens ficam alinhados em linha, ao invés de coluna */
            gap={1}
            component={Paper}>
            
            <Button
                color="primary"
                disableElevation
                variant="contained"
                startIcon={<Icon>save</Icon>}
            > Salvar </Button>

            <Button
                color="primary"
                disableElevation
                variant="outlined"
                startIcon={<Icon>add</Icon>}
            > Novo </Button>

            <Button
                color="primary"
                disableElevation
                variant="outlined"
                startIcon={<Icon>save</Icon>}
            > Salvar e voltar </Button>

            <Button
                color="primary"
                disableElevation
                variant="outlined"
                startIcon={<Icon>delete</Icon>}
            > Apagar </Button>

            <Divider variant='middle' orientation='horizontal' />

            <Button
                color="primary"
                disableElevation
                variant="outlined"
                startIcon={<Icon>arrow_back</Icon>}
            > Voltar </Button>
        </Box>
    );

    
}