import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

const HologramModel = () => {
    const groupRef = useRef<THREE.Group>(null)
    const { scene, animations } = useGLTF('/models/hologram/scene.gltf')
    const { actions } = useAnimations(animations, groupRef)
    const { camera } = useThree()

    useEffect(() => {
        camera.position.set(0, 2, 5)
        camera.lookAt(0, 0, 0)
    }, [camera])

    useEffect(() => {
        const firstAction = Object.values(actions)[0]
        firstAction?.play()
    }, [actions])

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005
        }
    })

    return (
        <group ref={groupRef}>
            <primitive object={scene} />
        </group>
    )
}

const Hologram = () => {
    return (
        <div className="w-[400px] h-[400px]">
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <HologramModel />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    )
}

export default Hologram
