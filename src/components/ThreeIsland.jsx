import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function ThreeIsland(){
  const ref = useRef(null)

  useEffect(()=>{
    const el = ref.current
    if(!el) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 1000)
    camera.position.z = 2

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(el.clientWidth, el.clientHeight)
    el.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(1,1,1)
    const material = new THREE.MeshStandardMaterial({ color: 0xffa500 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5,5,5)
    scene.add(light)

    let req
    function animate(){
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
      req = requestAnimationFrame(animate)
    }
    animate()

    function onResize(){
      renderer.setSize(el.clientWidth, el.clientHeight)
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    return ()=>{
      cancelAnimationFrame(req)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div ref={ref} style={{ width: '100%', height: '400px' }} />
  )
}
