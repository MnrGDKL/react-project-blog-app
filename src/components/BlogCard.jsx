import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { toastWarnNotify } from "../helpers/toastNotify";
import { BlogContext } from "../contexts/BlogContext";

export default function BlogCard({ item, index }) {
  const [click, setClick] = useState(true);
  const navigate = useNavigate();
  const {user} = React.useContext(AuthContext)   ///like make red and +1 function
  const {increaseLike, decreaseLike} = React.useContext(AuthContext)
  const {GetBlogs} = React.useContext(BlogContext);
  const {blogList, isLoading} = GetBlogs();
  
  const handleLike = () => {
    if (click) {
        increaseLike(item.id);
        setClick(!click);
      } else {
        decreaseLike(item.id)
        setClick(!click);
      }
    };

  const handleComment = () => {
  }

  const handleClick = () => {
    if (!user) {
      toastWarnNotify("You need to login first");
      navigate("/login");
    } else {navigate("/details", { state: { item } })}
  };

  return (
    <Card sx={{ width: 300, 
                cursor:"pointer",
                borderRadius: "10px",
                padding:"3px",
                ":hover": {boxShadow: "0 0 10px #046582"}}}>
      <div onClick={handleClick}>
        <div style={{display: "flex", 
                     height:"300px",
                     alignItems:"center"}}>
        <CardMedia
          component="img"
          sx={{margin: "auto", width: 300}}
          image={item.imageURL}
          alt={item.title}
          objectfit="contain"
        />
        </div>
        
        <CardContent>
          <h1 style={{textAlign:"center"}}>{`${item.title}`.substring(0, 20) + ``}</h1>
          <h6 style={{ color: "grey" }}>{item.date}</h6>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              height: "35%",
              display: "block",
              backgroundColor: "#EFEEFE",
              padding: "0.5rem",
            }}
          >
            <div
              style={{
                paddingTop: "1rem",
                textAlign: "justify",
                color: "#046582",
                borderRadius: "10px"
              }}
            >
            {`${item.content}`.substring(0, 100) + `...`}
            </div>

          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "black", textAlign: "start", mt: 2 }}
          >
            <IconButton sx={{ color: "black", p: 0 }}>
              <AccountCircleIcon fontSize="small" />
            </IconButton>
            {item.author}
          </Typography>
        </CardContent>
      </div>

      <CardActions disableSpacing>
        <IconButton
          onClick={handleLike}
          sx={{ color: `${item.like > 0 ? "red" : ""}` }}
          aria-label="add to favorites"
        >
          <FavoriteIcon />
        </IconButton>
        <span>{item.like}</span>
        <IconButton aria-label="comment"
                    onClick={handleComment}>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <span>{item.comment}</span>
      </CardActions>
    </Card>
  );
}