import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <Steps />
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
    // Sempre utilize essa estrutura de FUNÇÃO quando quer mudar
    // o estado de algo baseado EM SEU PRÓPRIO ESTADO.
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
    // Sempre utilize essa estrutura de FUNÇÃO quando quer mudar
    // o estado de algo baseado EM SEU PRÓPRIO ESTADO.
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button
              bgColor="#7950f2"
              textColor="#ffffff"
              onClick={handlePrevious}
            >
              <span>👈</span> Previous
            </Button>
            <Button bgColor="#7950f2" textColor="#ffffff" onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  // "children" é uma palavra reservada do React que todo componente tem acesso.
  // Seu valor é exatamente o que está entre a ABERUTRA e FECHAMENTO das tags do componente.
  // No exemplo acima, seria:
  // "<span>👈</span> Previous" e "Next <span>👉</span>"
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
