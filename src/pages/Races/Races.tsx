import { useContext } from "react";
import { GlobalStateContext } from "../../constants/context/globalState.context";

const Races = () => {
  const {
    state: { races },
  } = useContext(GlobalStateContext);

  if (!races) {
    return <div>loading ...</div>;
  }
  console.log(races[0].name.toLowerCase());

  return (
    <div>
      {races.map((race: any) => (
        <div>
          <h2>{race.name}</h2>
          <img src={"/assets/races/" + race.name.toLowerCase() + ".svg"} />
        </div>
      ))}
    </div>
  );
};

export default Races;
