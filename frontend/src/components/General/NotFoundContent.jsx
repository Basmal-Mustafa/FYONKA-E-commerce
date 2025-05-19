import React from 'react'
import '@/styles/NotFound.css'; // Import your CSS file for styling

export const NotFoundContent = () => {
  return (
    <div>
        <title>404 Page Not Found</title>
        <div className="error-container" >
            <h1 className='error-message'>404</h1> 
            <p className='text-center'> Oops! The page you're looking for is not here..</p>
            <a href="/home"> Go Back to Home </a>
        </div>
    </div>
  )
}
export default NotFoundContent;