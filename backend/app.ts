import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
  IPostData,
  
  
} from "./fakedb";
import { IncomingMessage } from "http";


const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);

    const decodedUser = jwt.verify(token, "secret");

    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

// SLEEP DELAY
app.get("/api/posts", async (req, res) => {
  setTimeout(() => {
    res.json(posts);
  }, 0);
});


// ⭐️ TODO: Implement this yourself

app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id); // Convert id to integer
  const post = posts.find((post) => post.id === id); // Find post by id
  if (!post) {
    // If post with provided id is not found, return 404
    res.status(404).json({ error: "Post not found" });
  } else {
    res.json(post); // Return post details
  }
});



/*
app.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  // The line below should be fixed.
  res.json(posts[0]);
});
*/
/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 
*/
app.post("/api/posts", (req, res) => {
  const incomingPost = req.body;
  addPost(incomingPost);

  res.status(200).json({ success: true });
});





app.listen(port, () => console.log("Server is running"));



