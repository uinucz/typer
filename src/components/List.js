import React from 'react'
import Stats from './Stats'

const List = ({ results }) => {
  return results.length === 0 ? null : (
    <table className="ui   table">
      <tbody className="">
        {results.map((x) => (
          <tr key={x.id} className="center aligned">
            <td className="two wide">
              <Stats text={x.speedWPM} label={'wpm'} size={'mini'} />
            </td>
            <td className="two wide">
              <Stats text={x.time} label={'sec'} size={'mini'} />
            </td>
            <td className="two wide ">
              <Stats text={x.speed} label={'char/min'} size={'mini'} />
            </td>
            <td className="eight wide" style={{ textAlign: 'left' }}>
              {x.info}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default List
