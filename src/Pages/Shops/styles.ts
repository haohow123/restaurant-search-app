import styled from '@emotion/styled';
import { ItemGroup } from '@tablecheck/tablekit-item';

import {
  BREAKPOINTS,
  Headline,
  PageWrapper,
  pageTransitionEasing,
  slideLeft
} from 'styles';

export const ShopsWrapper = styled(PageWrapper)`
  max-width: initial;
  animation: ${slideLeft} ${pageTransitionEasing} 0.5s;
`;

export const ShopsHeadline = styled(Headline)`
  text-align: center;
`;

export const ShopList = styled(ItemGroup)`
  margin: 0 auto;
  @media (min-width: ${BREAKPOINTS.tablet}) {
    max-width: 368px;
  }
`;

export const SorryMessage = styled('p')`
  margin: 0 auto;
  @media (min-width: ${BREAKPOINTS.tablet}) {
    max-width: 368px;
  }
`;
