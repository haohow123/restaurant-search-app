import styled from '@emotion/styled';
import { ItemGroup } from '@tablecheck/tablekit-item';

import {
  Headline,
  PageWrapper,
  BREAKPOINTS,
  pageTransitionEasing,
  slideUp
} from 'styles';

export const HomeWrapper = styled(PageWrapper)`
  max-width: initial;
  animation: ${slideUp} ${pageTransitionEasing} 0.5s;
`;

export const HomeHeadline = styled(Headline)`
  text-align: center;
`;

export const SearchWrapper = styled.div`
  & > div {
    margin: 0 auto;
  }
`;

export const Locations = styled(ItemGroup)`
@media (min-width: ${BREAKPOINTS.tablet}) {
  max-width:368px
`;
