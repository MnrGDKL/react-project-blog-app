import { 
  getDatabase,
  onValue,
  push,
  ref,
  set,
  remove, 
  update} from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import { toastSuccessNotify } from "../helpers/toastNotify";
import { AuthContext } from "./AuthContext";

export const BlogContext = createContext();

const d = new Date();
const time = d.toLocaleDateString();

const BlogContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [like, setLike] = useState(0);
  const [comment, setComment] = useState(0);

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
      like: info.like,
      comment: info.comment
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

  //!Delete Blog from Database
  const DeleteBlog = (id) => {
    const database = getDatabase();
    remove(ref(database, "blogDB/" + id));
    toastSuccessNotify("Blog Deleted");
  };

  //!Update Blog in Database
  const EditBlog = (info) => {
    const database = getDatabase();
    const updates = {};
    updates["blogDB/" + info.id] = info;
    return update(ref(database), updates);
  };

  //!incease like
  const increaseLike = (id) => {
    const database = getDatabase();
    const updates = {};
    updates["blogDB/" + id + "/like"] = like + 1;
    return update(ref(database), updates);
  };

  //!Descrease like
  const decreaseLike = (id) => {
    const database = getDatabase();
    const updates = {};
    updates["blogDB/" + id + "/like"] = like - 1;
    return update(ref(database), updates);
  };

  return (
    <BlogContext.Provider 
      value={{ 
        AddBlog,
        GetBlogs,
        DeleteBlog,
        EditBlog,
        increaseLike,
        decreaseLike
        }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;

