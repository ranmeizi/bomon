import { Box, styled } from "@mui/material";

export default styled(Box)(({ theme }) => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    paddingTop: theme.spacing(24),
    flexDirection: 'column',
    alignItems: 'center'
}))

