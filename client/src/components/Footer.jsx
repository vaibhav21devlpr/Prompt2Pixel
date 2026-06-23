import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
        <img src={assets.prompt2pixel_final} alt="Logo_image" width={250}/>
        <p className='flex-1 border-l border-gray-400 pl-12 text-sm text-gray-500
        max-sm:hidden'>
            Copyright @Vaibhav Pandey | All right reserved.
        </p>
        <div className='flex gap-4'>
            <a href="https://www.linkedin.com/in/vaibhavpandey21">
                <img src={assets.linkedin} alt="LinkedIn_Logo" width={35}/>
            </a>
            <a href="https://github.com/vaibhav21devlpr">
                <img src={assets.github} alt="Github_Logo" width={35}/>
            </a>
            <a href="mailto:vaibhavpandey791@gmail.com" aria-label="Send Email">
                <img src={assets.gmail} alt="Gmail_Logo" width={35}/>
            </a>
        </div>
    </div>
  )
}

export default Footer