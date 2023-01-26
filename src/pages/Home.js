import React from "react";
import BlurList from "../components/BlurList";
import TemporaryDrawer from "../components/Drawer";
import Animation from "../components/ShipAnimation";
import { Box, Typography } from "@mui/material";
import HorizontalTiles from "../components/HorizontalTiles";
import { Outlet, useNavigate } from 'react-router-dom'

export default function Home() {

    return (
        <>
        
            <HorizontalTiles/>
        </>
    );
}