import { useSelector } from "react-redux";

function Username() {
  // useSelector serve para acessar um valor do Redux salvo na store!
  const username = useSelector((state) => state.user.username);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
