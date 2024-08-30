import React, { useEffect, useRef } from 'react'
import { imageWave } from '../utils/Three'

const LeftPart = () => {

    const canvas = useRef(null);
    useEffect(() => {
        imageWave(canvas.current);
    })

    return (
            <div ref={canvas} className="canvas h-full w-1/2 relative flex items-center justify-center">
                <img draggable={false} className='absolute opacity-0 h-2/3 w-1/2 object-cover' src="https://plus.unsplash.com/premium_photo-1722081393584-895a109a63b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8" alt="" />
                <img draggable={false} className='absolute opacity-0 h-2/3 w-1/2 object-cover' src="https://plus.unsplash.com/premium_photo-1722077703164-b2c0cbefd9e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D" alt="" />
                <img draggable={false} className='absolute opacity-0 h-2/3 w-1/2 object-cover' src="https://images.unsplash.com/photo-1724770573710-6bdd6d679e36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <img draggable={false} className='absolute opacity-0 h-2/3 w-1/2 object-cover' src="https://images.unsplash.com/photo-1724765440530-e3954ac2e61d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
    )
}

export default LeftPart