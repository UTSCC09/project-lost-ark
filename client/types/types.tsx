export type CoinData = {
  _id: string;
  symbol: string;
  name: string;
  price: number;
};

export type CoinHistoryData = [number, number][];
