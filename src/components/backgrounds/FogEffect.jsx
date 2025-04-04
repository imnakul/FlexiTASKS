import { useEffect, useRef } from 'react'

const FogEffect = ({ particleColor = '#427d82' }) => {
   const canvasRef = useRef(null)

   // const hexToRgb = (hex) => {
   //    hex = hex.replace(/^#/, '')
   //    let r = parseInt(hex.substring(0, 2), 16)
   //    let g = parseInt(hex.substring(2, 4), 16)
   //    let b = parseInt(hex.substring(4, 6), 16)
   //    return `${r}, ${g}, ${b}`
   // }

   useEffect(() => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      let particles = []

      const resizeCanvas = () => {
         canvas.width = window.innerWidth
         canvas.height = window.innerHeight
      }

      const initParticles = () => {
         particles = []
         for (let i = 0; i < 100; i++) {
            particles.push({
               x: Math.random() * canvas.width,
               y: Math.random() * canvas.height,
               speedX: Math.random() * 1 - 0.5,
               speedY: Math.random() * 0.5 - 0.2,
               opacity: Math.random(),
               // color: particleColor, // Store the custom color
            })
         }
      }

      const animate = () => {
         ctx.clearRect(0, 0, canvas.width, canvas.height)
         particles.forEach((p) => {
            p.x += p.speedX
            p.y += p.speedY
            if (p.y > canvas.height) p.y = 0
            ctx.fillStyle = `rgba(200, 200, 200, ${p.opacity})`
            // ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.opacity})`
            ctx.beginPath()
            ctx.arc(p.x, p.y, 10, 0, Math.PI * 2)
            ctx.fill()
         })
         requestAnimationFrame(animate)
      }

      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
      initParticles()
      animate()

      return () => window.removeEventListener('resize', resizeCanvas)
   }, [particleColor])

   return (
      <canvas
         ref={canvasRef}
         className='absolute sm:top-[65px] top-[62px] left-0 w-full h-full'
      />
   )
}

export default FogEffect
