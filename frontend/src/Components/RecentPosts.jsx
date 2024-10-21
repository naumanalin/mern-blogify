import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BaseUrl, get } from '../Services/EndPoints'
import { useSelector } from 'react-redux';

const RecentPosts = () => {
    const user = useSelector((state) => state.auth.user);
    console.log('redux store wala user', user)

    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    const handNavigate = (id) => {
        navigate(`/post/${id}`)
    }

    const getPosts = async () => {
        try {
            const response = await get('/blog/posts')
            const data = response.data
            setPosts(data.posts)
            console.log(data)

            if (posts.length == 0) {
                console.log('zero post in posts object', posts)
            } else {
                console.log(`all post: ${posts}`)
            }

        } catch (error) {
            console.log(`Error Fetching All Post: ${error}`)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <>
            <div className="container">

                <div className="mb-5 text-center">
                    <h2 className="fw-bold fs-1 text-white">Recent Posts</h2>
                </div>

                <div className="row">

{posts && posts.map((data, index) => {
    return (
        <div key={index} className="col-md-4 col-lg-4 col-xs-12 mb-4">
            <div className="card text-white border-success" 
                 style={{ borderWidth: "2px", backgroundColor: "#2b2b2b", borderRadius: "10px", overflow: "hidden", height: "100%" }}>
                <img src={`${BaseUrl}/images/upload/${data.image}`} 
                     alt="post image" className="card-img-top img-fluid" />
                <div className="card-body bg-dark text-white d-flex flex-column">
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text">{data.des}</p>
                    <button className="btn btn-primary mt-auto"
                            onClick={() => handNavigate(data._id)}>Read Article</button>
                </div>
            </div>
        </div>
    )
})}

</div>


            </div>
        </>
    )
}

export default RecentPosts