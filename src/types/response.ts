import { LocaleCode } from '@tablecheck/locales';

type Location = {
  text: string;
  type: string;
  payload: {
    area: string;
    geo: {
      lat: number;
      lon: number;
    };
  };
};

type Shop = {
  text: string;
  payload: { shop_slug: string };
};

type Address = {
  country: string;
  city: string;
  postal_code: string;
  region: string;
  street: string;
  street2: string;
};

type ShopDetail = {
  banner_image: string;
  name_translations: { locale: LocaleCode; translation: string }[];
  phone: string;
  address: Address;
  alt_address: Address;
  budget_dinner_max: string;
  budget_dinner_min: string;
  budget_lunch_max: string;
  budget_lunch_min: string;
};

export type AutoCompleteResponse = {
  locations: Location[];
  shops: Shop[];
};

export type ShopsResponse = {
  shops: ShopDetail[];
  meta: { record_count: 1 };
};
