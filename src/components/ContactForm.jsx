import { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { FaStar } from 'react-icons/fa'

function ContactForm() {
   const [state, handleSubmit] = useForm('mzzeaved')
   const [rating, setRating] = useState(0)
   const [hover, setHover] = useState(0)

   if (state.succeeded) {
      return (
         <div className='p-6 text-center'>
            <div className=' mb-4 text-green-500 dark:text-green-400  '>
               <svg
                  className='mx-auto h-12 w-12'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='4'
                     d='M5 13l4 4L19 7'
                  />
               </svg>
            </div>
            <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-2'>
               Thank you for your feedback!
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
               We appreciate your time and input.
            </p>
         </div>
      )
   }

   const handleFormSubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      formData.append('rating', rating.toString())
      await handleSubmit(e)
   }

   return (
      <form onSubmit={handleFormSubmit} className='space-y-4'>
         {/* Name Field (Optional) */}
         <div>
            <label
               htmlFor='name'
               className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
            >
               Name (Optional)
            </label>
            <input
               id='name'
               type='text'
               name='name'
               className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200'
               placeholder='Your name'
            />
         </div>

         {/* Email Field (Required) */}
         <div>
            <label
               htmlFor='email'
               className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
            >
               Email Address <span className='text-red-500'>*</span>
            </label>
            <input
               id='email'
               type='email'
               name='email'
               required
               className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200'
               placeholder='your.email@example.com'
            />
            <ValidationError
               prefix='Email'
               field='email'
               errors={state.errors}
               className='mt-1 text-sm text-red-500'
            />
         </div>

         {/* Rating Selector */}
         <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
               Rate your experience <span className='text-red-500'>*</span>
            </label>
            <div className='flex gap-1'>
               {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1
                  return (
                     <button
                        type='button'
                        key={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                        className={`p-1 focus:outline-none transition-colors duration-200 ${
                           (hover || rating) >= ratingValue
                              ? 'text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                        }`}
                     >
                        <FaStar className='w-8 h-8' />
                     </button>
                  )
               })}
            </div>
            <input type='hidden' name='rating' value={rating} />
         </div>

         {/* Feedback/Message Field (Required) */}
         <div>
            <label
               htmlFor='message'
               className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
            >
               Feedback <span className='text-red-500'>*</span>
            </label>
            <textarea
               id='message'
               name='message'
               required
               rows='4'
               className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200'
               placeholder='Please share your feedback...'
            />
            <ValidationError
               prefix='Message'
               field='message'
               errors={state.errors}
               className='mt-1 text-sm text-red-500'
            />
         </div>

         {/* Submit Button */}
         <button
            type='submit'
            disabled={state.submitting || rating === 0}
            className='w-full px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
         >
            {state.submitting ? 'Sending...' : 'Submit Feedback'}
         </button>
      </form>
   )
}

export default ContactForm
