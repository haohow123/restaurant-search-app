import { Item } from '@tablecheck/tablekit-item';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Outlet, useParams, useNavigate } from 'react-router-dom';

import { AutoCompleteResponse } from 'types/response';
import { useFetch } from 'utils/useFetch';

import { ShopsHeadline, ShopsWrapper, ShopList } from './styles';

export function Shops(): JSX.Element {
  const [t, { language }] = useTranslation();
  const { terms } = useParams();
  const navigate = useNavigate();

  const { response } = useFetch<AutoCompleteResponse>(
    `https://staging-snap.tablecheck.com/v2/autocomplete?locale=en&shop_universe_id=57e0b91744aea12988000001&text=${terms}}`
  );
  const geoData = React.useMemo(() => {
    const location = response?.locations.find(({ text }) => text === terms);
    if (location) {
      return location.payload.geo;
    }
    return null;
  }, [response, terms]);

  return (
    <ShopsWrapper>
      <Outlet />
      <Helmet>
        <title lang={language}>{`${t('attributes.pages.shops')} - ${t(
          'keywords.app_name'
        )}`}</title>
      </Helmet>
      <ShopsHeadline>{t('attributes.pages.shops')}</ShopsHeadline>
      {response && geoData ? (
        <ShopList>
          {response.shops.map(({ text, payload }) => (
            <Item
              key={text}
              onClick={() =>
                navigate(
                  `../shop/${payload.shop_slug}?geo_latitude=${geoData.lat}&geo_longitude=${geoData.lon}`
                )
              }
            >
              {text}
            </Item>
          ))}
        </ShopList>
      ) : null}
    </ShopsWrapper>
  );
}
