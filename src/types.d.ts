export interface BtcPriceData {
    bitcoin: {
        usd: number;
    };
}

export interface MagicEdenBamkData {
    rune: string;
    runeNumber: number;
    symbol: string;
    ticker: string;
    name: string;
    totalSupply: string;
    formattedTotalSupply: string;
    divisibility: number;
    imageURI: string;
    minOrderSize: number;
    maxOrderSize: number;
    pendingTxnCount: number;
    floorUnitPrice: {
      formatted: string;
      value: string;
    };
    marketCap: number;
    holderCount: number;
    volume: {
      '1d': number;
      '7d': number;
      '30d': number;
      all: number;
    };
    deltaFloor: {
      '1d': number;
      '7d': number;
      '30d': number;
    };
    txnCount: {
      '1d': number;
      '7d': number;
      '30d': number;
    };
  }

export interface NusdRuneData {
    "amount": string,
    "runeid": string,
    "rune": string,
    "spacedRune": string,
    "symbol": string,
}
