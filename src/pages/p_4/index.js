import React from 'react'
import { Canvas } from 'react-three-fiber'
import { Physics, useSphere, useTrimesh } from '@react-three/cannon'
import { OrbitControls, useGLTF } from '@react-three/drei'

const WeirdCheerio = (props) => {
  const [ref] = useSphere(() => ({ mass: 1, args: props.radius, ...props }))
  console.log(props)
  return (
    <mesh ref={ref} receiveShadow>
      <sphereBufferGeometry attach="geometry" args={[props.radius,10,10]} />
      <meshNormalMaterial />
    </mesh>
  )
}

const Bowl = (props) => {
  const { nodes } = useGLTF('/bowl.glb')
  const geometry = nodes.bowl.geometry
  const vertices = geometry.attributes.position.array
  const indices = geometry.index.array

  const [ref] = useTrimesh(() => ({
    mass: 0,
    args: [vertices, indices],
    rotation: props.rotation,
    position: props.position,
    ...props
  }))

  return (
    <mesh
      receiveShadow
      ref={ref}
      geometry={geometry}
      {...props}>
      <meshNormalMaterial />
    </mesh>
  )
}

export default function Page4() {
  return (
  <div className="canvas_wrapper">
  <Canvas 
  shadowMap
  camera={{ position: [0, 5, 10], fov: 50 }}
  >
    <color attach="background" args={['#171720']} />
    <ambientLight intensity={0.3} />
    <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
    <OrbitControls />
    <Physics
    iterations={1}
    tolerance={0.0001}
    defaultContactMaterial={{
      friction: 0.8,
      restitution: 0.2,
      contactEquationStiffness: 1e7,
      contactEquationRelaxation: 1,
      frictionEquationStiffness: 1e7,
      frictionEquationRelaxation: 2,
    }}
    gravity={[0, -80, 0]}
    allowSleep={false}
    >
      <Bowl position={[0, 0, 0]} rotation={[0, 0, 0]} />
      <WeirdCheerio radius={0.1} position={[0.5, 2, 0]} />
    </Physics>
  </Canvas>
  </div>
  )
}