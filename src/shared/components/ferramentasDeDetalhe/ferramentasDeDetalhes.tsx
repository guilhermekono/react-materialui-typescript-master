import {Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme} from '@mui/material';

interface IFerramentasDeDetalheProps{
    textoBotaoNovo?: string;

    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEFechar?: boolean;

    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;
    mostrarBotaoApagarCarregando?: boolean;
    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoSalvarEFecharCarregando?: boolean;

    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmSalvar?: () => void;
    aoClicarEmSalvarEFechar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({

    textoBotaoNovo = 'novo',

    mostrarBotaoNovo = true,
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEFechar = false,

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEFecharCarregando = false,

    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
    aoClicarEmSalvarEFechar,


    }) => {

    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    

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
            
            
            
            {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
            <Button
                onClick={aoClicarEmSalvar}
                color="primary"
                disableElevation
                variant="contained"
                startIcon={<Icon>save</Icon>}
            > 
                <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden"> 
                    Salvar
                </Typography>
            
            </Button>
            )}

            {mostrarBotaoSalvarCarregando &&(
                <Skeleton width={64} height={40} />
            )}

            {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) && (
            <Button
                onClick={aoClicarEmNovo}
                color="primary"
                disableElevation
                variant="outlined"
                startIcon={<Icon>add</Icon>}
            > 
                <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                    {textoBotaoNovo}
                </Typography>
            </Button>
            )}

            {(mostrarBotaoNovoCarregando && !smDown) &&(
                <Skeleton width={64} height={40} />
            )}

            {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown) &&(
            <Button
                onClick={aoClicarEmSalvarEFechar}
                color="primary"
                disableElevation
                variant="outlined"
                startIcon={<Icon>save</Icon>}
            > 
                <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                    Salvar e fechar
                </Typography>
            </Button>
            )}

            {(mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown) && (
                <Skeleton width={64} height={40} />
            )}

            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
            <Button
                onClick={aoClicarEmApagar}  
                color="primary"
                disableElevation
                variant="outlined"
                startIcon={<Icon>delete</Icon>}
            > 
                <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                    Apagar
                </Typography> 
            </Button>
            )}

            {
                (
                    mostrarBotaoVoltar &&
                    (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEFechar)
                ) && (
                    <Divider variant='middle' orientation='horizontal' />
                )
            }
            
            {mostrarBotaoApagarCarregando &&(
                <Skeleton width={64} height={40} />
            )}
            
            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
            <Button
                onClick={aoClicarEmVoltar}
                color="primary"
                disableElevation
                variant="outlined"
                startIcon={<Icon>arrow_back</Icon>}
            > 
                <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                    Voltar 
                </Typography>
            
            </Button>
            )}

            {mostrarBotaoVoltarCarregando &&(
                <Skeleton width={64} height={40} />
            )}

        </Box>
    );

    
}