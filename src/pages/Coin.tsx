import { useParams } from "react-router-dom";

export default function Coin() {
  const { coinId } = useParams();

  return <h1>코인 : {coinId} </h1>;
}
