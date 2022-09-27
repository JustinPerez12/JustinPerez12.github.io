import React from 'react'
import Resume from '../../Assets/Justin_D.Perez_Resume.pdf'

const CTA = () => {
  return (
    <div className='cta'>
        <a href={Resume} download className='btn'>Download My Resume</a>
        <a href="#contact" className='btn btn-primary'>Contact Information</a>
    </div>
  )
}

export default CTA