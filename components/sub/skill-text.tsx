"use client"
import React from 'react'
import {motion} from 'framer-motion'
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '@/utils/motion'
import { SparklesIcon } from '@heroicons/react/24/solid'

const SkillText = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center gap-6'>
<motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#fa65bc8b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#df29d9] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px] text-white">
            Our Tech stack
          </h1>
        </motion.div>
        
            <h1 className=" text-3xl md:text-5xl font-bold text-center text-white">
  Explore the <span className="text-purple-400">tech stack</span> behind <span className="text-purple-400">Pixel Perfect</span>
</h1>
      
        <motion.div
        variants={slideInFromRight(0.5)}
        className='cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center'
        >
            this is our tech stack
        </motion.div>
    </div>
  )
}

export default SkillText