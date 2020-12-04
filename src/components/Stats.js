import React from 'react'

const Stats = ({ text, label, size }) => {
  const cName = 'ui  align center ' + size + ' teal statistic'
  return (
    <div className="column">
      <div className={cName}>
        <div className="value" align="center">
          {text}
        </div>
        <div align="center"> {label} </div>
      </div>
    </div>
  )
}

export default Stats
