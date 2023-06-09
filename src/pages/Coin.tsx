// 수정 : 5.31
// 기존 useEffect, useState이용했던것을 useQuery로 대체함

import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import { styled } from "styled-components";
import { fetchInfoData, fetchPriceData } from "../api";
import { useNavigate } from "react-router-dom";

const Title = styled.h1`
  font-size: 3rem;
  color: ${(props) => props.theme.accentColor};
`;

const BackBtn = styled.button`
  background-color: ${(props) => props.theme.bgColor};
  border: none;
  font-size: 1.5rem;
  margin-right: 1rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;

const Loader = styled.div`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.div<{ isactive: string }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isactive === "true"
      ? props.theme.accentColor
      : props.theme.textColor};
  a {
    display: block;
  }
`;
// isActive로 작명시 React는 DOM요소에 사용자 정의 속성을 추가하는 것을 허용하지 않으므로
// isactive로 작명후 true / false를 string으로 받은후 비교연산자로 "true" 체크;

interface RouteState {
  state: {
    name: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

export default function Coin() {
  const { coinId } = useParams();
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchInfoData(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
    ["price", coinId],
    () => fetchPriceData(coinId),
    {
      refetchInterval: 5000,
    }
  );
  // Link state로 받은 데이터정보
  const { state } = useLocation() as RouteState;

  // 해당 URL에 들어가있으면 오브젝트를 받음
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coindId/chart");

  // useQuery의 isLoading이 두개이므로 둘다 아래처럼 설정
  const loading = infoLoading || priceLoading;
  const navigate = useNavigate();

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <BackBtn onClick={() => navigate("/")}>&larr;</BackBtn>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{priceData?.quotes?.USD?.price?.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isactive={`${chartMatch !== null}`}>
              <Link to="chart">Chart</Link>
            </Tab>
            <Tab isactive={`${priceMatch !== null}`}>
              <Link to="price">Price</Link>
            </Tab>
          </Tabs>
          <Outlet />
        </>
      )}
    </Container>
  );
}

// state?.name ? state.name : loading ? "Loading..." : info?.name -> http://localhost:3000/btc-bitcoin 이 URL로
//  바로접속시 Loading...이 계속 뜨는걸 방지
