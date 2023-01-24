import { Box, Typography, ThemeProvider, createTheme, Grid} from '@mui/material';
import React, { useRef, Suspense, useState, useEffect, useMemo, useLayoutEffect } from 'react';
import Animation from "../components/Brick";



import Montserrat from "../fonts/Montserrat/static/Montserrat-Bold.ttf"
import Montserrat_Light from "../fonts/Montserrat/static/Montserrat-Light.ttf"
import Courier_Prime from "../fonts/Courier_Prime/CourierPrime-Regular.ttf"


import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';



const theme = createTheme({
    typography: {
        fontFamily: 'Source Code Pro, Montserrat, Roboto',
    },
});


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function BrickToByte() {

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{backgroundColor:"black", height:'100vh', width:'100%'}}>
                <Animation/>
                <Box sx={{position:"relative", textAlign:"center"}}>
                    <Typography sx={{color: "white", fontFamily:"Source Code Pro", fontSize: '150px'}}>
                        BRICK 2
                    </Typography>
                    <Typography sx={{color: "white", fontFamily:"Source Code Pro", fontSize: '150px'}}>
                        BYTE
                    </Typography>
                </Box>
            </Box>      
            <Box sx={{position:"relative"}}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                        <Item>xs=6 md=8</Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Item>xs=6 md=4</Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Item>xs=6 md=4</Item>
                    </Grid>
                    <Grid item xs={6} md={8}>
                        <Item>xs=6 md=8</Item>
                    </Grid>
                </Grid>
            </Box>  
        </ThemeProvider>
    );
}