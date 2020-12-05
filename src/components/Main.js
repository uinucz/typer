import React from 'react'

const Main = ({ left, read, word, wordR, incorrectLength }) => {
  const greenText = {
    background: '#9AF74E',
    textDecoration: 'underline',
  }
  const incorrectUnderline = {
    // textDecoration: 'underline',
    // textDecorationColor: 'red',
    background: '#ffb5eb',
  }
  const newFont = {
    fontFamily: 'Roboto',
  }

  const secondPart = word.slice(wordR.length) + left.join(' ')
  const incorrectText = secondPart.slice(0, incorrectLength)
  const leftText = secondPart.slice(incorrectLength)

  return (
    <div className="ui segment" style={newFont}>
      <div className="ui container ">
        <p className="large text">
          <span style={greenText}> {read.join(' ')}</span>
          <span style={greenText}> {wordR}</span>
          <span style={incorrectUnderline}>{incorrectText}</span>
          <span>{leftText}</span>
        </p>
      </div>
    </div>
  )
}

export default Main
