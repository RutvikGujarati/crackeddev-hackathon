import React from 'react'
import Navbar from '../Components/Navbar'
import JobsAPI from '../api/APIComponents'

const jobs = () => {
  return (
    <div>
        <Navbar />
      <JobsAPI />
    </div>
  )
}

export default jobs
