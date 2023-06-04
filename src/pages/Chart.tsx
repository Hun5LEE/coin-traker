import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";

type TCoin = string;

export default function Chart() {
  const { coinId } = useParams<TCoin>();

  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return <h1>Chart</h1>;
}
