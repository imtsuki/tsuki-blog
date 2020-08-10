import * as React from 'react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { Link } from 'gatsby';

import { heights, dimensions, colors } from '@/styles/variables';
import Container from '@/components/Container';
import titleSvg from '@/images/title.svg';

const StyledHeader = styled.header`
  height: ${heights.header}px;
  padding: 0 ${dimensions.containerPadding}rem;

  color: ${transparentize(0.5, colors.white)};
`;

const HeaderInner = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const HomepageLink = styled(Link)`
  font-size: 0;
`;

const NavigationLink = styled(Link)`
  color: ${colors.black};
  font-size: 1rem;
  margin-left: 1rem;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

const NavigationBar = styled.div(`
  display: flex;
  flex-direction: row;
`);

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <StyledHeader>
    <HeaderInner>
      <HomepageLink to="/">
        <img src={titleSvg} alt={title} />
      </HomepageLink>
      <NavigationBar>
        <NavigationLink to="/about">About</NavigationLink>
        <NavigationLink to="/rss.xml">RSS</NavigationLink>
      </NavigationBar>
    </HeaderInner>
  </StyledHeader>
);

export default Header;
