import { Box, Typography } from '@mui/material';
import React, { useRef, Suspense, useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Vector3 } from "three";
import { Html, OrbitControls, Loader, Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

import { AsciiEffect } from 'three-stdlib'


let width;
let height;


const Brick = () => {
    // had to use a const path here because of how react router interacts w the canvas element  
    const path = require("../mario-brick-block/source/Mario Brick.fbx");
    const fbx = useLoader(FBXLoader, path);
    const ref = useRef();
    useFrame((state, delta) => (ref.current.rotation.y += delta / 2))


    return (
        <mesh
        position={[0,-20,15]}
        ref={ref}>
            <primitive object={fbx} scale={0.4} position={[-3,0,0]}/>
        </mesh>
    );
};

function AsciiRenderer({
    renderIndex = 1,
    bgColor = 'black',
    fgColor = 'white',
    characters = ' .:-+*=%#~',
    invert = false,
    color = false,
    resolution = 0.15
  }) {
    // Reactive state
    const { size, gl, scene, camera } = useThree()
  
    // Create effect
    const effect = useMemo(() => {
      const effect = new AsciiEffect(gl, characters, { invert, color, resolution })
      effect.domElement.style.position = 'absolute'
      effect.domElement.style.top = '0px'
      effect.domElement.style.left = '0px'
      effect.domElement.style.pointerEvents = 'none'
      return effect
    }, [characters, invert, color, resolution])
  
    // Styling
    useLayoutEffect(() => {
      effect.domElement.style.color = fgColor
      effect.domElement.style.backgroundColor = bgColor
    }, [fgColor, bgColor])
  
    // Append on mount, remove on unmount
    useEffect(() => {
      gl.domElement.style.opacity = '0'
      gl.domElement.parentNode.appendChild(effect.domElement)
      return () => {
        gl.domElement.style.opacity = '1'
        gl.domElement.parentNode.removeChild(effect.domElement)
      }
    }, [effect])
  
    // Set size
    useEffect(() => {
      effect.setSize(size.width, size.height)
    }, [effect, size])
  
    // Take over render-loop (that is what the index is for)
    useFrame((state) => {
      effect.render(scene, camera)
    }, renderIndex)
  
    // This component returns nothing, it is a purely logical
}


export default function Animation(props) {
    width = window.innerWidth;
    height = window.innerHeight;


    let navigate = useNavigate();

    function handleClick() {
        navigate('./home');
    }

    return (
        <Box sx={{height:"100vh", backgroundColor:"transparent", position: "absolute", height:'100vh', width:'100%'}}>
            <Canvas camera={{ fov: 70, position: [0, 2, 100] }}>
              <Suspense>
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <directionalLight position={[-10, -10, -5]} intensity={2} />
                <Brick/>
                {/* <OrbitControls/> */}
                <AsciiRenderer fgColor="white" bgColor="#141414" />
                
              </Suspense>
            </Canvas>
        </Box>
    )
}

