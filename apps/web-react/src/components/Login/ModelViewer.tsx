import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import type { LoginType } from './index'

const MODEL_MAP: Record<LoginType, string> = {
    login: '/models/login/scene.gltf',
    register: '/models/register/scene.gltf',
}

const Model = ({ url }: { url: string }) => {
    const groupRef = useRef<THREE.Group>(null)
    const { scene, animations } = useGLTF(url)
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
            groupRef.current.rotation.y += 0.003
        }
    })

    return (
        <group ref={groupRef}>
            <primitive object={scene} />
        </group>
    )
}

interface ModelViewerProps {
    loginType: LoginType
    onChangeType: (type: LoginType) => void
}

const ModelViewer = ({ loginType, onChangeType }: ModelViewerProps) => {
    const modelUrl = MODEL_MAP[loginType]

    return (
        <div className="w-[600px] h-[700px] bg-gradient-to-b from-indigo-900 to-gray-900 relative flex flex-col">
            <div className="flex-1">
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <Model url={modelUrl} key={loginType} />
                    <OrbitControls enableZoom={false} />
                </Canvas>
            </div>
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
                <button
                    type="button"
                    onClick={() => onChangeType('login')}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${
                        loginType === 'login'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white/20 text-white/70 hover:bg-white/30'
                    }`}
                >
                    登录
                </button>
                <button
                    type="button"
                    onClick={() => onChangeType('register')}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${
                        loginType === 'register'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white/20 text-white/70 hover:bg-white/30'
                    }`}
                >
                    注册
                </button>
            </div>
        </div>
    )
}

export default ModelViewer
