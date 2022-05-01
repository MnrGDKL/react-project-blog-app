import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BlogContext } from '../contexts/BlogContext';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import BlogIcon from "../assets/blok.png"
import {toastSuccessNotify} from "../helpers/toastNotify";


const initialValues = { 
  title: "",
  imageURL: "",
  content: "",
  like:0,
  comment:0
};

const NewBlog = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState(initialValues);
  const {AddBlog} = useContext(BlogContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    AddBlog(info);
    navigate("/");
    toastSuccessNotify("New Blog Added Successfully");
  };
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  const style = {
    boxSizing: "border-box",
    backgroundPosition: "center",
    backgroundImageRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    padding: "1rem",
    backgroundImage: `url("https://picsum.photos/1200/900")`,
  };

  return (
    <div style={style}>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.75) 10px 10px 5px 0px",
          backgroundColor: "#fff",
          position: "relative",
        }}
      >
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={BlogIcon}
            alt="login_blog"
            style={{
              width: "150px",
              height: "150px",
              margin: "1rem",
              padding: "0.5rem",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          />

          <Typography
            sx={{ color: "rgb(25, 118, 210)", fontFamily: "Girassol" }}
            component="h1"
            variant="h5"
          >
            ── New Blog ──
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <form id="register" action="" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="imageURL"
                label="Image URL"
                type="url"
                id="imageURL"
                onChange={handleChange}
              />

              <TextField
                margin="normal"
                multiline
                minRows={6}
                required
                fullWidth
                name="content"
                label="content"
                type="textarea"
                id="content"
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "rgb(25, 118, 210)" }}
              >
                SUBMIT
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default NewBlog