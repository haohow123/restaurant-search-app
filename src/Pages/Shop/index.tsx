import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Outlet, useParams, useLocation } from 'react-router-dom';

import { ShopsResponse } from 'types/response';
import { useFetch } from 'utils/useFetch';

import { ShopsHeadline, ShopsWrapper, ShopDetails, ShopDetail } from './styles';

export function Shop(): JSX.Element {
  const [t, { language }] = useTranslation();
  const { locale, slug } = useParams();
  const { search } = useLocation();

  // for address
  const isEn = locale === 'en';

  const { response } = useFetch<ShopsResponse>(
    `https://staging-snap.tablecheck.com/v2/shops/${slug}${search}locale=en&shop_universe_id=57e0b91744aea12988000001`
  );
  const shop = React.useMemo(() => {
    if (!response) return null;
    if (!response.shops.length) return null;
    const {
      banner_image,
      name_translations,
      phone,
      address,
      alt_address,
      budget_dinner_max,
      budget_dinner_min,
      budget_lunch_max,
      budget_lunch_min
    } = response.shops[0];

    // restaurant's name
    const localName = name_translations.find((name) => locale === name.locale);
    const nameTranslation =
      localName ||
      name_translations.find((name) => name.locale === 'en') ||
      name_translations.find((name) => name.locale === 'ja');

    return {
      bannerImage: banner_image,
      nameTranslation,
      phone,
      address:
        locale === 'ja'
          ? { ...address, postalCode: address.postal_code }
          : { ...alt_address, postalCode: alt_address.postal_code },
      budget: {
        lunch:
          budget_lunch_min && budget_lunch_max
            ? [budget_lunch_min, budget_lunch_max]
            : null,
        dinner:
          budget_dinner_min && budget_dinner_max
            ? [budget_dinner_min, budget_dinner_max]
            : null
      }
    };
  }, [response, locale]);

  return (
    <ShopsWrapper>
      <Outlet />
      <Helmet>
        <title lang={language}>{`${t('attributes.pages.shop')} - ${t(
          'keywords.app_name'
        )}`}</title>
      </Helmet>
      <ShopsHeadline>{t('attributes.pages.shop')}</ShopsHeadline>
      {shop ? (
        <ShopDetails>
          <img src={shop.bannerImage} alt="banner" />
          <ShopDetail>
            {t('shop_detail.name')} : {shop.nameTranslation?.translation}
          </ShopDetail>
          <ShopDetail>
            {t('shop_detail.city')} : {shop.address.city}({shop.address.country}
            )
          </ShopDetail>
          <ShopDetail>
            {t('shop_detail.address')} :
            {isEn
              ? `${shop.address.street2}, ${shop.address.street}, ${shop.address.region} (${shop.address.postalCode})`
              : ` (${shop.address.postalCode}) ${shop.address.region}, ${shop.address.street}, ${shop.address.street2}`}
          </ShopDetail>
          <ShopDetail>
            {t('shop_detail.budget.lunch')} :{' '}
            {shop.budget.lunch
              ? `${shop.budget.lunch[0]} ~
              ${shop.budget.lunch[0]}`
              : 'no data'}
          </ShopDetail>
          <ShopDetail>
            {t('shop_detail.budget.dinner')} :{' '}
            {shop.budget.dinner
              ? `${shop.budget.dinner[0]} ~
              ${shop.budget.dinner[0]}`
              : 'no data'}
          </ShopDetail>
        </ShopDetails>
      ) : null}
    </ShopsWrapper>
  );
}
