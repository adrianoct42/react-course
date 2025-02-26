import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { skills } from "./skillData";

function App() {
  return (
    <div className="card">
      <Avatar img="./Foto6.jpg" />
      <div className="data">
        <Intro
          name="Adriano Chamon"
          introText="Front End focused web developer, likes to use ReactJS. When not coding, enjoys videogames a lot, especially RPGs, Platformer and 2D Fighting Games. Also enjoys volleyball, Rock and Jazz music, talking with friends and a good glass of strong beer (even if he can't take more than 2 glasses). Nice to meet you!"
        />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar(props) {
  return <img className="avatar" src={props.img} alt={props.name}></img>;
}

function Intro(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <h4>{props.introText}</h4>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      {skills.map((skillItem, index) => (
        <h4 key={index} className="skill" style={{ backgroundColor: skillItem.color }}>
          {skillItem.skill} {skillItem.level === "beginner" ? "👶" : skillItem.level === "intermediate" ? "👍" : "💪"}
        </h4>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
