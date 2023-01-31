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
    palette: {
        mode: 'dark',
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
            <Box sx={{backgroundColor:"#141414", height:'100vh', width:'100%'}}>
                <Animation/>
                <Box sx={{position:"relative",height:'100vh',width:'100%'}}>
                    <Grid container direction="column"
                        justifyContent="space-between"
                        alignItems="stretch"
                        height='100vh'
                        >
                        <Grid item sx={{pr:20}}>
                            <Typography sx={{color: "white", fontFamily:"Source Code Pro", fontSize: '150px', textAlign:"right"}}>
                                BRICK
                            </Typography>
                        </Grid>
                        <Grid item sx={{pl:20}}>
                            <Typography sx={{color: "white", fontFamily:"Source Code Pro", fontSize: '150px'}}>
                                2 BYTE
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>      
            <Box sx={{position:"relative", height:"50vh", backgroundColor:"#141414"}}>
                <Grid container spacing={2} height={1}>
                    <Grid item xs={1} md={2}/>
                    <Grid item xs={10} md={8}>
                        <Item sx={{height:'75%'}}>Test</Item>
                    </Grid>
                    <Grid item xs={1} md={2}/>
                </Grid>
            </Box>  
            <Box sx={{position:"relative", height:"50vh", backgroundColor:"#141414"}}>
                <Grid container spacing={2} height={1} justifyContent={'flex-end'}>
                    <Grid item xs={6} md={6} sx={{border:1, borderColor:'white'}}>
                        <Item sx={{height:'75%', width:'75%'}}>Test</Item>
                    </Grid>
                    <Grid item xs={6} md={6}/>
                </Grid>
            </Box>  
        </ThemeProvider>
    );
}