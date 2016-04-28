import React from 'react'
import { Entity } from 'draft-js'

export default (props) => {
  const { entities } = props
  const fields = Object.keys(entities[0])

  return (
    <div>
      <table>
        <thead>
        <tr>
          {fields.map((field, idx) => (
            <th key={idx}>{field}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {entities.map((entity, idx) => (
          <tr key={idx}>
            {fields.map((field, subIdx) => (
              <td key={subIdx}>{entity[field]}</td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}
