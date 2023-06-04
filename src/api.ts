// 데이터를 받아오는 파일

const BASE_URL = `https://api.coinpaprika.com/v1`;

type TCoinId = string | undefined;

export async function fetchCoins() {
  const data = await (await fetch(`${BASE_URL}/coins`)).json();
  return data;
}

export async function fetchInfoData(coinId: TCoinId) {
  const infoData = await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
  return infoData;
}

export async function fetchPriceData(coinId: TCoinId) {
  const priceData = await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
  return priceData;
}
// Date.now()는 현재 타임스탬프를 반환하는 메서드
// Date.now()를 사용하면 가비지 컬렉터의 일을 덜어주고, new Date().getTime()보다 빠르게작동함.
export async function fetchCoinHistory(coinId: TCoinId) {
  // api만료로인해 endDate, startDate 필요없음
  // const endDate = Math.floor(Date.now() / 1000);
  // const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  const coinHistory = await (
    await fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`)
  ).json();
  return coinHistory;
}
