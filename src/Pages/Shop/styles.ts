import styled from '@emotion/styled';
import { Spacing } from '@tablecheck/tablekit-theme';

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

export const ShopDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: ${Spacing.L2};

  @media (min-width: ${BREAKPOINTS.tablet}) {
    padding: 0 ${Spacing.L8};
  }

  @media (min-width: ${BREAKPOINTS.desktop}) {
    flex-direction: row;
  }
`;

export const ShopDetail = styled.div`
  padding-top: ${Spacing.L2};
`;
