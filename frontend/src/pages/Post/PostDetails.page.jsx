import classes from "./PostDetails.module.css";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";



function PostDetailsPage() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [id]);

  if (!post) {
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );
  }

  const { title, category, content, image, userId } = post;
  const authorName = userId.split("@")[0]; // Extracting author name from email

  return (
    <Container className={classes.container}>

      <div className={classes.details}>

        <h2>{title}</h2>
        <p>Author: {authorName}</p>
        <p>Category: {category}</p>
        <p>{content}</p>
        
        <Button>
        <Link to="/posts">Back to Posts</Link>
      </Button>
        
      </div>

      <div className={classes.image}>
      <img src={image} alt={title} style={{ maxWidth: "100%" }} />
      <Button style={{ marginTop: '10px' }} component={Link} to={`/posts/${id}/edit`}>Edit</Button>
      </div>

    </Container>
  );
}

export const postDetailsLoader = async ({ params }) => {
  // In a real application, you would fetch data from the backend here
  return null;
};

export default PostDetailsPage;




