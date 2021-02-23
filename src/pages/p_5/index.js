import { Canvas } from 'react-three-fiber'
import { Physics, useBox } from 'use-cannon'
import SphereGroup from './sphereGroup.js'

function Ground(props) {
  
  const { args = props.size } = props
  const [ref] = useBox(() => ({ args, ...props }))
  
  return (
    <mesh 
    visible 
    receiveShadow 
    position={props.position}
    ref={ref} 
    >
      <boxBufferGeometry attach="geometry" args={args} />
      <meshLambertMaterial attach="material" color="red" />
    </mesh>
  )
}

export default function Page5() {

  return (
    <div className="canvas_wrapper">
      <Canvas shadowMap gl={{ alpha: false }} camera={{ position: [0, 10, 35], fov: 70 }} >
        <color attach="background" args={['lightblue']} />
        <hemisphereLight intensity={0.35} />
        <spotLight position={[20, 20, 20]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <Physics
        iterations={1}
        tolerance={0}
        defaultContactMaterial={{
          friction: 30,
          restitution: 0,
          contactEquationStiffness: 1e7,
          contactEquationRelaxation: 1,
          frictionEquationStiffness: 1e7,
          frictionEquationRelaxation: 2,
        }}
        gravity={[0, -80, 0]}
        allowSleep={false}
        >
          <Ground position={[0,0,-15]} size={[15, 0.2, 30]} />
          <Ground position={[7.5,0,-43]} size={[30, 0.2, 15]} />
          <Ground position={[15,0,-73]} size={[15, 0.2, 30]} />
          <SphereGroup position={[0, 20, 0]} />
        </Physics>

      </Canvas>
    </div>
  )
}