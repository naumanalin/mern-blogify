import React from 'react'
import RecentPosts from '../Components/RecentPosts'

const Home = () => {
  return (
   <>
   <div className="container-fluid bg-dark hero-section text-center">
    <h1 className="fs-1 fw-bold text-light">WELCOME TO BLOGIFY</h1>
    <p className="text-light fs-5 mt-3">
      Dive into a world of creativity, insights, and inspiration. Discover the extrarodinary in the ordinary.
    </p>
   </div>

   <div className="container-fluid recent-posts">
    <RecentPosts />
   </div>
   </>
  )
}

export default Home