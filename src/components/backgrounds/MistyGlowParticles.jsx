import { useEffect, useRef } from 'react'

const MistyGlowParticles = () => {
   const canvasRef = useRef(null)

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
         for (let i = 0; i < 50; i++) {
            particles.push({
               x: Math.random() * canvas.width,
               y: Math.random() * canvas.height,
               size: Math.random() * 8 + 2,
               speedX: Math.random() * 0.5 - 0.25,
               speedY: Math.random() * 0.5 - 0.25,
               opacity: Math.random() * 0.5 + 0.5,
            })
         }
      }

      const animate = () => {
         ctx.clearRect(0, 0, canvas.width, canvas.height)

         particles.forEach((p) => {
            p.x += p.speedX
            p.y += p.speedY

            if (p.x > canvas.width || p.x < 0) p.speedX *= -1
            if (p.y > canvas.height || p.y < 0) p.speedY *= -1

            ctx.fillStyle = `rgba(200, 200, 255, ${p.opacity})`
            ctx.shadowBlur = 10
            ctx.shadowColor = 'rgba(200, 200, 255, 1)'

            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fill()
         })

         requestAnimationFrame(animate)
      }

      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
      initParticles()
      animate()

      return () => window.removeEventListener('resize', resizeCanvas)
   }, [])

   return (
      <canvas ref={canvasRef} className='absolute top-0 left-0 w-full h-full' />
   )
}

export default MistyGlowParticles
