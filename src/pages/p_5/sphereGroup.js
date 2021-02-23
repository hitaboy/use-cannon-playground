import { useEffect, useRef, useState } from 'react' 
import { useFrame } from 'react-three-fiber'
import { useSphere } from 'use-cannon'
import { PerspectiveCamera } from '@react-three/drei'

export default function SphereGroup(props) {

  const cam = useRef()
  const [ref, api] = useSphere(() => ({args: 1, mass: 1, position: props.position, rotation: [0, 0, 0], ...props }))

  const velocity = useRef([0, 0, 0])
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [])

  const [ started, setStarted ] = useState(false)
  const [ goUp, setGoUp ] = useState(false)
  const [ goDown, setGoDown ] = useState(false)
  const [ goLeft, setGoLeft ] = useState(false)
  const [ goRight, setGoRight ] = useState(false)
  const [ goJump, setGoJump ] = useState(false)

  const impulse = 4
  const maxVelocity = impulse*4
  
  useEffect(() => {

    const keyDownControls = (event) =>{
      setStarted(true)
      if(event.key === 'ArrowUp'){ setGoUp(true) }
      if(event.key === 'ArrowDown'){ setGoDown(true)}
      if(event.key === 'ArrowLeft'){ setGoLeft(true) }
      if(event.key === 'ArrowRight'){ setGoRight(true) }
      if(event.key === ' '){ setGoJump(true) }
    }

    const keyUpControls = (event) =>{
      setGoUp(false)
      setGoDown(false)
      setGoLeft(false)
      setGoRight(false)
      setGoJump(false)
    }
    window.addEventListener('keydown', keyDownControls)
    window.addEventListener('keyup', keyUpControls)
    return () => {
      window.removeEventListener('keydown', keyDownControls)
      window.removeEventListener('keyup', keyUpControls)
    }
  }, [api])

  useFrame(() => {
    
    if(goUp){
      if(velocity.current[2]>(-maxVelocity)){
        api.applyImpulse([0, 0, -impulse], [0, 0, 0])
      }
    }
    if(goLeft){
      if(velocity.current[0]>(-maxVelocity)){
        api.applyImpulse([-impulse, 0, 0], [0, 0, 0])
      }
    }
    if(goRight){
      if(velocity.current[0]<maxVelocity){
        api.applyImpulse([impulse, 0, 0], [0, 0, 0])
      }
    }
    if(goDown){
      if(velocity.current[2]<maxVelocity){
        api.applyImpulse([0, 0, impulse], [0, 0, 0])
      }
    }
    if(goJump){
      if(velocity.current[1]<maxVelocity){
        api.applyImpulse([0, impulse*4, 0], [0, 0, 0])
      }
    }
    if(started && !goUp && !goDown && !goLeft && !goRight && !goJump){
      let vx = velocity.current[0]
      let vy = velocity.current[1]
      let vz = velocity.current[2]
      if(vx>0){
        vx -= 0.1
      }else if(vx<0){
        vx += 0.1
      }
      /*
      if(vy>0){
        vy -= 1
      }else if(vy<0){
        vy += 0.1
      }
      */
      if(vz>0){
        vz -= 1
      }else if(vz<0){
        vz += 0.1
      }
      api.velocity.set(vx, vy, vz)
    }

   
    if(ref.current.position.y< -2){
      api.velocity.set(0, 0, 0)
      // ref.current.position.set(props.position)
      
    }
    
    cam.current.position.set(ref.current.position.x,ref.current.position.y+10,ref.current.position.z+30)
  })

  return (
    <>
    <PerspectiveCamera makeDefault ref={cam} position={[0, 10, 35]} fov={70} />
    <mesh 
    castShadow 
    ref={ref}
    position={props.position}
    onClick={() => { api.velocity.set(0,20,20) }}
    >
      <sphereBufferGeometry attach="geometry" args={[1,20,20]} />
      <meshNormalMaterial attach="material" />
    </mesh>
    </>
  )
}