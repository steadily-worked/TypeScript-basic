interface Country {
  CountryCode: 'AF';
  Date: string;
  ID: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  Premium: any;
  Slug: string;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}

interface Global {
  Date: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}

export interface CovidSummaryResponse {
  Countries: Country[];
  Date: string;
  Global: Global;
  Message: string;
  //   Countries: [{ID: "b9848a00-8bc4-461c-abd2-7d0834544d01", Country: "Afghanistan", CountryCode: "AF",…},…]
  // Date: "2021-07-01T07:03:53.038Z"
  // Global: {NewConfirmed: 376554, TotalConfirmed: 181715259, NewDeaths: 7963, TotalDeaths: 3938409,…}
  // ID: "777eb7ce-35d0-4d50-a6e4-8331417b1992"
  // Message: ""
}
