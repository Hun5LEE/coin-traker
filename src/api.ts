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
