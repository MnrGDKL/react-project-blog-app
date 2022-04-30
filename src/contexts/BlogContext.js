import { 
  getDatabase,
  onValue,
  push,
  ref,
  set } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const BlogContext = createContext();

const d = new Date();
const time = d.toLocaleDateString();

const BlogContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  //!Add Blog to database
  const AddBlog = (info) => {
    const database = getDatabase();
    const blogRef = ref(database, "blogDB");
    const newBlogRef = push(blogRef);
    set(newBlogRef, {
      title: info.title,
      imageURL: info.imageURL,
      content: info.content,
      author: user.email,
      date: time,
    });
  };

  //!Get Blogs from Database
  const GetBlogs = () => {
    const [blogList, setBlogList] = useState();
    const [isLoading, setIsLoading] = useState();
    useEffect(() => {
      setIsLoading(true);
      const database = getDatabase();
      const blogRef = ref(database, "blogDB");

      onValue(blogRef, (snapshot) => {
        const blogsDB = snapshot.val();
        console.log("blogsDB", blogsDB);
        const blogArray = [];
        for (let id in blogsDB) {
          blogArray.push({id, ...blogsDB[id]});
        }
        console.log("blogArray", blogArray);
        setBlogList(blogArray);
        setIsLoading(false);
      });
    }, []);

    return { blogList, isLoading };
  };


  return (
    <BlogContext.Provider value={{ AddBlog, GetBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;

