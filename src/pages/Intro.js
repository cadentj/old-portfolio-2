import React from "react";
import BlurList from "../components/BlurList";
import TemporaryDrawer from "../components/Drawer";
import Animation from "../components/ShipAnimation";
import { Box, Typography } from "@mui/material";


export default function Intro() {

    return (
        <Box sx={{backgroundColor:"black", height:'100vh', width:'100%', position:'absolute'}}>
            <Animation/>
        </Box>        
    );
}