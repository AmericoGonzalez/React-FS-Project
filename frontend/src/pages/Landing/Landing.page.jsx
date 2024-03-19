import { Button, Container } from "@mantine/core";
import myImage from './images/screen1.jpg';
import { Link } from "react-router-dom";
import './Landing.css';

const Landing = () => {
  return (
    <Container>
      <div className="centered-box">
      <h1>Welcome to our app for photographers</h1>
      <p>You can use this app to post your pictures collections like this:</p>
      <img src={myImage} alt="example of a post" />  
   
      </div>

      <div className="presentation">
      <p>Hello my name is Americo, please use
          the button below to see the diagrams.
        </p>
      </div>

      <div className="centered-button">
      <Button>
      <Link to="/flows"> SEE FLOW DIAGRAMS</Link>
      </Button>
      </div>

      
    </Container>
  );
};

export default Landing;
