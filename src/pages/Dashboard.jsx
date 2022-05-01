import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import loading from "../assets/loading.gif";
import { BlogContext } from '../contexts/BlogContext';
import BlogCard from '../components/BlogCard';

const Dashboard = () => {
  const user = useContext(AuthContext);
  console.log("Dashboard User: ", user);

  const {GetBlogs} = useContext(BlogContext);
  const {blogList, isLoading} = GetBlogs();

  return (
    <div>
      <h1 style={{textAlign: "center"}}>
          ──── Dashboard ────
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          // margin: "3rem",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <img src={loading} alt="loadingSpinner" />
        ) : (
          <>
            {blogList?.map((item, index) => (
              <BlogCard item={item} key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard