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

export type AutoCompleteResponse = {
  locations: Location[];
  shops: Shop[];
};
