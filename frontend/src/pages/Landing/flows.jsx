import { Container } from "@mantine/core";

import myImage1 from './images/loginflow.png';
import myImage2 from './images/postpageflow.png';
import './Landing.css';

const Flows = () => {
  return (
    <Container>
     
      <div className="centered-box">
      <h2>Login Flow</h2>
      <img src={myImage1} alt="login flow" />
      <h2>Post page Flow</h2>
      <img src={myImage2} alt="post page flow" />   
      </div>
      
    </Container>
  );
};

export default Flows;