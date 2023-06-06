import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

const PriceList = styled.ul`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`;

const PriceItem = styled.li`
  padding: 0.3rem;
`;

type TCoin = string;

interface ICoinHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

export default function Price() {
  const { coinId } = useParams<TCoin>();
  const { isLoading, data } = useQuery<ICoinHistory[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <>
      {isLoading ? (
        <h1>Loading Price...</h1>
      ) : (
        <PriceList>
          {data?.map((price, i) => {
            return (
              <PriceItem key={i}>
                {i === 0 ? "Today" : `Before ${i} Days`}Time Close Price :{" "}
                {price?.time_close}
              </PriceItem>
            );
          })}
        </PriceList>
      )}
    </>
  );
}
