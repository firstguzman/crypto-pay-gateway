export enum Fiat {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
  ARS = 'ARS',
  AUD = 'AUD',
  BGN = 'BGN',
  BOB = 'BOB',
  BRL = 'BRL',
  CAD = 'CAD',
  CHF = 'CHF',
  CLP = 'CLP',
  COP = 'COP',
  DKK = 'DKK',
  DOP = 'DOP',
  GEL = 'GEL',
  HUF = 'HUF',
  ISK = 'ISK',
  JPY = 'JPY',
  KRW = 'KRW',
  MXN = 'MXN',
  NOK = 'NOK',
  NZD = 'NZD',
  PEN = 'PEN',
  PLN = 'PLN',
  PYG = 'PYG',
  RON = 'RON',
  SEK = 'SEK',
  SGD = 'SGD',
  SVC = 'SVC',
  UYU = 'UYU',
}

export enum Status {
  NR = 'NR',
  PE = 'PE',
  AC = 'AC',
  IA = 'IA',
  CO = 'CO',
  CA = 'CA',
  EX = 'EX',
  OC = 'OC',
  RF = 'RF',
  FA = 'FA',
  DE = 'DE',
}

export interface Order {
  address: string
  cryptoAmount: number
  currencyId: string
  expiredTime: string
  fiat: Fiat
  fiatAmount: number
  identifier: string
  merchantDevice: string
  notes: string
  status: Status
  creationDate: string
}
