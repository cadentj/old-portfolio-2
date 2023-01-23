import { Box, Typography, ThemeProvider, createTheme } from '@mui/material';
import React, { useRef, Suspense, useState, useEffect, useMemo, useLayoutEffect } from 'react';
import Animation from "../components/Brick";



import Montserrat from "../fonts/Montserrat/static/Montserrat-Bold.ttf"
import Montserrat_Light from "../fonts/Montserrat/static/Montserrat-Light.ttf"
import Courier_Prime from "../fonts/Courier_Prime/CourierPrime-Regular.ttf"

const theme = createTheme({
    typography: {
        fontFamily: 'Source Code Pro, Montserrat',
    },
  });
  

export default function BrickToByte() {

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{backgroundColor:"black", height:'100vh', width:'100%', position:'absolute'}}>
                <Animation/>
                <Box sx={{position:"relative", textAlign:"center", te}}>
                    <Typography sx={{color: "white", fontFamily:"Source Code Pro", fontSize: '150px'}}>
                        Brick To
                    </Typography>
                    <Typography sx={{color: "white", fontFamily:"Source Code Pro", fontSize: '150px'}}>
                        Byte
                    </Typography>
                </Box>
            </Box>        
        </ThemeProvider>
    );
}