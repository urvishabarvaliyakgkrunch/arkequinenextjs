// src/lib/addressOptions.ts
// Matches the countries ShippingCalculator confirmed the store actually ships to/bills from.
export const COUNTRIES = [
  { code: "IE", label: "Ireland" },
  { code: "NI", label: "Northern Ireland" },
  { code: "GB", label: "United Kingdom (UK)" },
];

// Ireland is the only country WooCommerce gives a state/county list for on this store.
export const IE_COUNTIES = [
  { code: "CW", label: "Carlow" },
  { code: "CN", label: "Cavan" },
  { code: "CE", label: "Clare" },
  { code: "CO", label: "Cork" },
  { code: "DL", label: "Donegal" },
  { code: "D", label: "Dublin" },
  { code: "G", label: "Galway" },
  { code: "KY", label: "Kerry" },
  { code: "KE", label: "Kildare" },
  { code: "KK", label: "Kilkenny" },
  { code: "LS", label: "Laois" },
  { code: "LM", label: "Leitrim" },
  { code: "LK", label: "Limerick" },
  { code: "LD", label: "Longford" },
  { code: "LH", label: "Louth" },
  { code: "MO", label: "Mayo" },
  { code: "MH", label: "Meath" },
  { code: "MN", label: "Monaghan" },
  { code: "OY", label: "Offaly" },
  { code: "RN", label: "Roscommon" },
  { code: "SO", label: "Sligo" },
  { code: "TA", label: "Tipperary" },
  { code: "WD", label: "Waterford" },
  { code: "WH", label: "Westmeath" },
  { code: "WX", label: "Wexford" },
  { code: "WW", label: "Wicklow" },
];
