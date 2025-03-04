import { Loader } from 'lucide-react'
import React from 'react'

export default function loading() {
  return (
   <div className='w-full h-full flex items-center justify-center'>
    <Loader size={32} />
   </div>
  )
}
