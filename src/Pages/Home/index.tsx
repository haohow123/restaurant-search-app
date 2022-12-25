import { Input, InputSize } from '@tablecheck/tablekit-input';
import { Item } from '@tablecheck/tablekit-item';
import { Size } from '@tablecheck/tablekit-theme';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { useDebounce } from 'react-use';

import { AutoCompleteResponse } from 'types/response';
import { useFetch } from 'utils/useFetch';

import { SearchWrapper, HomeHeadline, HomeWrapper, Locations } from './styles';

export function Home(): JSX.Element {
  const [t, { language }] = useTranslation();

  // search event
  const [searchVal, setSearchVal] = React.useState('');
  const [searchUrl, setSearchUrl] = React.useState('');
  const { response } = useFetch<AutoCompleteResponse>(searchUrl);
  useDebounce(
    () => {
      if (searchVal) {
        setSearchUrl(
          `https://staging-snap.tablecheck.com/v2/autocomplete?locale=en&shop_universe_id=57e0b91744aea12988000001&text=${searchVal}`
        );
      }
    },
    300,
    [searchVal]
  );
  return (
    <HomeWrapper>
      <Outlet />
      <Helmet>
        <title lang={language}>{`${t('attributes.titles.headline')} - ${t(
          'keywords.app_name'
        )}`}</title>
      </Helmet>
      <HomeHeadline>{t('attributes.titles.headline')}</HomeHeadline>
      <SearchWrapper>
        <Input
          placeholder={t('keywords.search')}
          size={InputSize.Regular}
          width={Size.XXLarge}
          label={t('keywords.search')}
          type="search"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        {response && response.locations ? (
          <Locations>
            {response.locations.map(({ text, payload }) => (
              <Item key={`${text}-${payload.area}`}>{text}</Item>
            ))}
          </Locations>
        ) : null}
      </SearchWrapper>
    </HomeWrapper>
  );
}
