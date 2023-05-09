import React from 'react'
import { Image } from 'react-bootstrap'
import ERRORIMG from "/src/assets/error-image.webp"

const Error = () => {
  return (
    <div className="error-container">
    <Image src={ERRORIMG} fluid />
    </div>
  )
}

export default Error