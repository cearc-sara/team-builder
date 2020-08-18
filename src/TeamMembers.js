import React from 'react'

export default function TeamMembers(props) {
  const { details } = props

  if (!details) {
    return <h3>Working fetching your Team Members&apos;s details...</h3>
  }

  return (
    <div className='Team Members container'>
      <h2>{details.name}</h2>
      <p>Email: {details.email}</p>
      <p>Role: {details.role}</p>
    </div>
  )
}
