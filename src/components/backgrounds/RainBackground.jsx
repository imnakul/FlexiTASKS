'use client'
import { useEffect, useRef } from 'react'

const RainBackground = ({ rainColor = '#5c9ded', density = 100 }) => {
   const canvasRef = useRef(null)

   useEffect(() => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      let w, h
      let raindrops = []

      const resizeCanvas = () => {
         w = canvas.width = window.innerWidth
         h = canvas.height = window.innerHeight
         initRaindrops()
      }

      const initRaindrops = () => {
         raindrops = []
         for (let i = 0; i < density; i++) {
            raindrops.push({
               x: Math.random() * w,
               y: Math.random() * h,
               length: Math.random() * 20 + 10,
               speedY: Math.random() * 5 + 3,
               opacity: Math.random() * 0.5 + 0.3,
            })
         }
      }

      const draw = () => {
         ctx.clearRect(0, 0, w, h)
         ctx.strokeStyle = rainColor
         ctx.lineWidth = 2

         raindrops.forEach((drop) => {
            drop.y += drop.speedY
            if (drop.y > h) drop.y = -drop.length

            ctx.globalAlpha = drop.opacity
            ctx.beginPath()
            ctx.moveTo(drop.x, drop.y)
            ctx.lineTo(drop.x, drop.y + drop.length)
            ctx.stroke()
            ctx.globalAlpha = 1
         })

         requestAnimationFrame(draw)
      }

      resizeCanvas()
      draw()
      window.addEventListener('resize', resizeCanvas)

      return () => window.removeEventListener('resize', resizeCanvas)
   }, [rainColor, density])

   return (
      <canvas ref={canvasRef} className='fixed top-0 left-0 w-full h-full' />
   )
}

export default RainBackground
