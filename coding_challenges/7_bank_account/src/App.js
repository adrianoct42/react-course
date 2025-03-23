import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

export default function App() {
  function reducer(state, action) {
    switch (action.type) {
      case "openAcc":
        return {
          ...initialState,
          isActive: true,
          balance: state.balance + action.payload,
        };
      case "deposit":
        return { ...state, balance: state.balance + action.payload };
      case "withdraw":
        return {
          ...state,
          balance:
            state.balance >= 50
              ? state.balance - action.payload
              : state.balance,
        };
      case "requestLoan":
        if (state.loan > 0) return state;
        return {
          ...state,
          balance: state.balance + action.payload,
          loan: action.payload,
        };
      case "payLoan":
        if (state.loan === 0 || state.balance <= state.loan) return state;
        return {
          ...state,
          balance: state.balance - action.payload,
          loan: state.loan - action.payload,
        };
      case "closeAcc":
        return state.balance === 0 &&
          state.loan === 0 &&
          state.isActive === true
          ? { ...initialState, isActive: false }
          : { ...state };
      default:
        console.log(
          "Invalid action.type! Check your code for inconsistencies!"
        );
    }
  }

  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <h3>Balance: {balance}</h3>
      <h3>Loan: {loan}</h3>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "openAcc", payload: 500 });
          }}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "deposit", payload: 150 });
          }}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withdraw", payload: 50 });
          }}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "requestLoan", payload: 5000 });
          }}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan", payload: 5000 });
          }}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "closeAcc" });
          }}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
