import { Canvas } from 'react-three-fiber'
import { Physics, usePlane, useSphere } from 'use-cannon'

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2.1, 0, 0], ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1009, 1000]} />
      <shadowMaterial attach="material" color="#888888" />
    </mesh>
  )
}

function Sphere(props) {
  const [ref] = useSphere(() => ({ mass: 1, position: [0, 5, 0], rotation: [0.4, 0.2, 0.5], ...props }))
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <sphereBufferGeometry attach="geometry" args={[1,30,30]} />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  )
}

export default function Page1() {
  return (
    <div className="canvas_wrapper">
      <Canvas shadowMap sRGB gl={{ alpha: false }} camera={{ position: [0, 10, 10], fov: 80 }}>
        <color attach="background" args={['lightblue']} />
        <hemisphereLight intensity={0.35} />
        <spotLight position={[20, 20, 20]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <Physics>
          <Plane />
          <Sphere position={[2, 20, -2]} />
          <Sphere position={[-1, 10, -1]} />
          <Sphere position={[0, 20, -2]} />
        </Physics>
      </Canvas>
    </div>
  )
}