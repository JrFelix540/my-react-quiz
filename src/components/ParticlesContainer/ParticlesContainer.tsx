import React, { Fragment } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "../../utils";
import "./ParticlesContainer.css";

interface ParticlesContainerProps {
  score: number;
}

const ParticlesContainer: React.FC<ParticlesContainerProps> = ({ score }) => {
  const { width, height } = useWindowSize();
  return (
    <Fragment>
      <Confetti height={height} width={width} />
      <p className="particles-text">You've scored {score} out of 10.</p>
      {score >= 5 && (
        <p className="particles-subtext">
          You're really smart🤓.{" "}
          <a href="/" className="link">
            Wanna try again?
          </a>
        </p>
      )}
      {score < 5 && (
        <p className="particles-subtext">
          Better luck next time 😞.{" "}
          <a href="/" className="link">
            Wanna try again?
          </a>
        </p>
      )}
    </Fragment>
  );
};

export default ParticlesContainer;
