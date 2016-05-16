import React from 'react'
import { Entity } from 'draft-js'

export default (props) => {
  const entity = Entity.get(props.block.getEntityAt(0))
  const { columns, data } = entity.getData()
  // console.log(data)
  
  return (
    <table>
      <thead>
      <tr>
        {columns.map((column, idx) => (
          <th key={idx}>{column}</th>
        ))}
      </tr>
      </thead>
      <tbody>
      {data.map((entity, idx) => (
        <tr key={idx}>
          {columns.map((column, subIdx) => (
            <td key={subIdx}>{entity[column]}</td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
}
