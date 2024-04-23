import React from 'react'

const Button = ({
    children,
    type='button',
    bgColor='bg-red-500',
    textColor='text-white',
    ...props
}) => {
  return (
    <div className={`px-4 py-2 rounded-lg ${ type } ${ bgColor } ${textColor } `} {...props}>
        {children}
    </div>
  )
}

export default Button