import { useLocation, useNavigate } from "react-router";
import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { Box, Container, CssBaseline, Stack } from "@mui/material";
import { BlogContext } from "../contexts/BlogContext";
import { AuthContext } from "../contexts/AuthContext";

const Details = () => {
  const location = useLocation();
  const item = location.state.item;

  const navigate = useNavigate();
  const { DeleteBlog } = useContext(BlogContext);
  const { user } = useContext(AuthContext);

  const handleErase = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
        DeleteBlog(id);
        navigate("/");
    }
  };
  const handleUpdate = () => {
    navigate("/update-blog", { state: { item } });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Typography
          sx={{ color: "#046582", fontFamily: "Girassol" }}
          variant="h2"
          component="h2"
          textAlign="center"
          marginTop="2rem"
        >
          ──── DETAILS ────
        </Typography>
        <Box sx={{ height: "70%" }}>
          <Card
            sx={{
              width: "80%",
              height: "40%",
              display: "block",
              margin: "auto",
              marginBottom: 4,
              // marginTop: 4
            }}
          >
            <CardMedia
              component="img"
              alt={item.title}
              height="60%"
              image={item.imageURL}
              objectfit="contain"
            />
            <CardContent
              sx={{
                display: "block",
                backgroundColor: "#EFEEFE",
                padding: "0.5rem",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Girassol",
                  color: "#046582",
                  fontSize: "2rem",
                }}
                gutterBottom
                variant="h5"
                component="div"
              >
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.date}
              </Typography>
              <Typography sx={{ textAlign: "start" }}>
                {item.content}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography sx={{ color: "black", textAlign: "start" }}>
                <IconButton sx={{ color: "black" }}>
                  <AccountCircleIcon fontSize="medium" />
                </IconButton>
                {item.author}
              </Typography>
            </CardContent>
            <CardActions sx={{ marginTop: -2 }}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <span>{item.like}</span>
              <IconButton aria-label="comment">
                <ChatBubbleOutlineIcon />
              </IconButton>
              <span>{item.comment}</span>
            </CardActions>
          </Card>
          {item.author === user?.email ? (
            <Stack
              direction="row"
              sx={{
                display: "flex",
                justifyContent: "space-around",
                marginY: 3,
              }}
            >
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => {
                  handleUpdate(item.id);
                }}
              >
                Update
              </Button>
              <Button
                size="large"
                variant="contained"
                color="error"
                onClick={() => {
                  handleErase(item.id);
                }}
              >
                Delete
              </Button>
            </Stack>
          ) : null}
        </Box>
      </Container>
    </React.Fragment>
  );
};
export default Details;