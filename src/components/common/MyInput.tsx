import React from 'react'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const MyInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <input className="myInput" ref={ref} {...props} />
))

export default MyInput
