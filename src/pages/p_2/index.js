import { Canvas, useFrame } from 'react-three-fiber'
import { Physics, useBox, useSphere } from 'use-cannon'

function Ground(props) {
  
  const { args = [30, 30, 1] } = props
  const [ref, api] = useBox(() => ({ args }))

  useFrame(state => {
    api.rotation.set(-Math.PI / 2, state.mouse.x, 0)
    api.position.set(0, (state.mouse.y*4)-8, 0)
  })
  return (
    <mesh 
    visible 
    receiveShadow 
    ref={ref} 
    onClick={(event) => console.log('ep')}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshLambertMaterial attach="material" color="red" />
    </mesh>
  )
}

function Sphere(props) {
  const [ref] = useSphere(() => ({args: 2, mass: 1, position: [0, 20, 0], rotation: [0, 0, 0], ...props }))
  return (
    <mesh castShadow ref={ref}>
      <sphereBufferGeometry attach="geometry" args={[2,20,20]} />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  )
}

export default function Page2() {
  return (
    <div className="canvas_wrapper">
      <Canvas shadowMap gl={{ alpha: false }} camera={{ position: [0, 10, 35], fov: 70 }}>
        <color attach="background" args={['lightblue']} />
        <hemisphereLight intensity={0.35} />
        <spotLight position={[20, 20, 20]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <Physics
        iterations={20}
        tolerance={0.0001}
        defaultContactMaterial={{
          friction: 0.9,
          restitution: 0.7,
          contactEquationStiffness: 1e7,
          contactEquationRelaxation: 1,
          frictionEquationStiffness: 1e7,
          frictionEquationRelaxation: 2,
        }}
        gravity={[0, -80, 0]}
        allowSleep={false}
        >
          <Ground />
          <Sphere />
        </Physics>
      </Canvas>
    </div>
  )
}