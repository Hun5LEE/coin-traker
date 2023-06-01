export async function fetchCoins() {
  const data = await (
    await fetch("https://api.coinpaprika.com/v1/coins")
  ).json();
  return data;
}
