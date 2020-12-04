import React from 'react'

const Button = ({ onClickFunction, text, colour }) => {
  const cName = 'ui ' + colour + ' button'
  return (
    <button className={cName} onClick={onClickFunction}>
      &nbsp; {text}
    </button>
  )
}

export default Button
