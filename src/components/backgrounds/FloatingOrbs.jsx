'use client'
import { useEffect, useRef } from 'react'

const FloatingGlowingOrbs = ({
   orbCount = 50,
   orbColor = '#FF00FF',
   maxSize = 10,
   speed = 0.3,
   glowOpacity = 0.4,
}) => {
   const canvasRef = useRef(null)

   useEffect(() => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      let animationFrameId
      let orbs = []

      const resizeCanvas = () => {
         canvas.width = window.innerWidth
         canvas.height = window.innerHeight
      }

      const createOrbs = () => {
         orbs = []
         for (let i = 0; i < orbCount; i++) {
            orbs.push({
               x: Math.random() * canvas.width,
               y: Math.random() * canvas.height,
               vx: (Math.random() - 0.5) * speed,
               vy: (Math.random() - 0.5) * speed,
               size: Math.random() * maxSize + 2,
               opacity: Math.random() * glowOpacity + 0.2,
            })
         }
      }

      const drawOrbs = () => {
         ctx.clearRect(0, 0, canvas.width, canvas.height)

         orbs.forEach((orb) => {
            orb.x += orb.vx
            orb.y += orb.vy

            if (orb.x < 0 || orb.x > canvas.width) orb.vx *= -1
            if (orb.y < 0 || orb.y > canvas.height) orb.vy *= -1

            ctx.beginPath()
            ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2)
            ctx.fillStyle = orbColor
            ctx.globalAlpha = orb.opacity
            ctx.shadowColor = orbColor
            ctx.shadowBlur = 20
            ctx.fill()
            ctx.globalAlpha = 1
         })

         animationFrameId = requestAnimationFrame(drawOrbs)
      }

      resizeCanvas()
      createOrbs()
      drawOrbs()

      window.addEventListener('resize', resizeCanvas)

      return () => {
         cancelAnimationFrame(animationFrameId)
         window.removeEventListener('resize', resizeCanvas)
      }
   }, [orbCount, orbColor, maxSize, speed, glowOpacity])

   return <canvas ref={canvasRef} className='fixed inset-0 z-0 w-full h-full' />
}

export default FloatingGlowingOrbs
