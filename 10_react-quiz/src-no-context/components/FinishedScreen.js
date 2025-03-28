import { useQuiz } from "../contexts/QuizContext";

function FinishedScreen() {
  const { points, maxPoints, highscore, dispatch } = useQuiz();

  const percentage = (points / maxPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🏅";
  if (percentage >= 80 && percentage < 100) emoji = "🥇";
  if (percentage >= 50 && percentage < 80) emoji = "🥈";
  if (percentage > 0 && percentage < 50) emoji = "🥉";
  if (percentage === 0) emoji = "😶‍🌫️";

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percentage)}%) {emoji}
      </p>
      <p className="highscore">Highscore: {highscore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishedScreen;
