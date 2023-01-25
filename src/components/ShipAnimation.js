import { Box, Typography } from '@mui/material';
import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Camera, Vector3 } from "three";
import { Html, OrbitControls, Loader, Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

import Montserrat from "../fonts/Montserrat/static/Montserrat-Bold.ttf"
import Montserrat_Light from "../fonts/Montserrat/static/Montserrat-Light.ttf"
import Courier_Prime from "../fonts/Courier_Prime/CourierPrime-Regular.ttf"

import { ScrollControls, useScroll} from '@react-three/drei';

import { Points, PointMaterial } from '@react-three/drei'
import * as random from '@react-three/drei/node_modules/maath/random/dist/maath-random.esm'

import { PerspectiveCamera } from '@react-three/drei';

// Dummy target for camera lerp
const dummy = new Vector3()
// Mouse tracking library data
let trackedX;
let trackedY;
let width;
let height;
// Frame updated ship position
let x = 0;
let y = 0;
// Has camera reached ship on scroll
// Moved out of milky method to prevent it from reloading on state update
let reached = false;
// Text doesn't render initially for some reason, but all other meshes do
// When the milky way mesh renders, it updates state to render in the lagging text
let hasRendered = false;


const MiningStation = () => {
    const fbx = useLoader(FBXLoader, "./Death Star/Death Star.FBX");

    const ref = useRef();
    useFrame(() => (ref.current.rotation.y += 0.005));

    const planetMesh = <mesh
        ref={ref}
        // Actual position
        position={[30, -2, 15]}
    >
        // Position around which the station rotates
        {/* <primitive object={fbx} position={[-1, 0, 4.65]} scale={0.01} /> */}
        <primitive  object={fbx} scale={0.05} />
    </mesh>;

    return planetMesh;
};




const Cover = () => {
    return (
        <>
            <Text
                scale={[15, 15, 1]}
                position={[0, 25, 10]}
                color="white" // default
                font={Montserrat}
                letterSpacing={0.3}
            >
                CADEN
            </Text>
            <Text
                scale={[15, 15, 1]}
                position={[0, -25, 10]}
                color="white" // default
                font={Montserrat}
                letterSpacing={0.3}
            >
                JUANG
            </Text>
            <Text
                scale={[2, 2, 30]}
                position={[0, -40, 10]}
                color="white" // default
                font={Courier_Prime}
            >
                &gt;&gt;&gt;  scroll to fly &lt;&lt;&lt;
            </Text>
            <Text
                scale={[0.5, 0.5, 1]}
                position={[0, -5, 0]}
                color="white" // default
                font={Courier_Prime}
                letterSpacing={0.3}
            >
                &gt;&gt;&gt;  click to continue &lt;&lt;&lt;
            </Text>
        </>
    )
};



function Stars(props) {
    const ref = useRef();

    useFrame((state) => {ref.current.rotation.y += 0.004})

    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 200 }))
    return (
      <group >
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
          <PointMaterial transparent color="#ffffff" size={0.3} sizeAttenuation={true} depthWrite={false} />
        </Points>
      </group>
    )
}

const Destroy = () => {
    const gltf = useLoader(GLTFLoader, "./star_destroyer/scene.gltf");

    const ref = useRef();
    useFrame(() => (ref.current.rotation.y += 0.005));

    const planetMesh = <mesh
        ref={ref}
        position={[26, -3, 15]}
    >
        // Position around which the station rotates
        <primitive object={gltf.scene} position={[-10, 0, 20]} rotation={[0,-Math.PI/1.8,0]} scale={0.3} />
    </mesh>;

    return planetMesh;
};


const Ship = () => {
    const fbx = useLoader(FBXLoader, "./X-Wing.fbx");
    
    return (
        <mesh
            position={[0, 2, 15]}
            rotation={[0, Math.PI, 0]}
        >
            <primitive object={fbx} scale={0.001} />
        </mesh>
    );
};

const MouseTrackingShip = () => {

    const ref = useRef()
    useFrame(() => {
        if ((trackedX !== null && !isNaN(trackedX)) && (trackedY !== null && !isNaN(trackedY))) {
            const xFactor = width / 0.25;
            const yFactor = height / 0.15;
            const xHalf = width / 2;
            const yHalf = height / 2;
            let transformedX = (Math.abs(xHalf - trackedX) / xFactor) * ((trackedX < xHalf) ? -1 : 1);
            let transformedY = (Math.abs(yHalf - trackedY) / yFactor) * ((trackedY > yHalf) ? -1 : 1);
            transformedX /= 15;
            transformedY /= 15;
            x += (x < 0.35 && x > -0.35) ? transformedX : ((x >= 0) ? -0.0002 : 0.0002);
            y += (y < 0.15 && y > -0.15) ? transformedY : ((y >= 0) ? -0.0002 : 0.0002);
        } else {
            x += 0;
            x += 0;
        }

        ref.current.rotation.set(-y, x, 0)
    })

    return (
        <mesh ref={ref}>
            <Ship />
        </mesh>
    )
}

const Composition = () => {
    const scroll = useScroll()
    let camera_pos = ""
    const [count, setCount] = useState(0);

    useFrame((state, delta) => {
        const offset = scroll.offset
        state.camera.position.set(0,2, (100 - offset * 80))
    })
    
    const ref = useRef()

    return (
        <>
            {/* <PerspectiveCamera makeDefault position={camera_pos}/> */}
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <directionalLight position={[-10, -10, -5]} intensity={1} />
            <Suspense>
                <Cover />
                <Stars/>
                <MiningStation />
                <MouseTrackingShip/>
                <Destroy/>
            </Suspense>
        </>
    )
}

export default function Animation(props) {
    width = window.innerWidth;
    height = window.innerHeight;


    let navigate = useNavigate();

    function handleClick() {
        navigate('./home');
    }

    return (
        <div onMouseMove={(event) => {
            trackedX = event.clientX;
            trackedY = event.clientY;
        }}>

            <Box sx={{height:"100vh", backgroundColor:"black"}}>
                
                    <Canvas camera={{ fov: 70}}>
                        <ScrollControls pages={5}>
                            <Composition/>
                        </ScrollControls>
                    </Canvas>
                    <Loader />
            </Box>
        </div>
    )
}
