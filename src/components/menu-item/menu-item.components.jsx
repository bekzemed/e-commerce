import React from 'react';
import './menu-item.styles.scss';
import { withRouter } from 'react-router-dom'; // higher order component that gives menu-item-component to access router parameters
import {
  BackgroundImageContainer,
  ContentContainer,
  MenuItemContainer,
  ContentTitle,
  ContentSubtitle,
} from './menu-item.styles';

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => {
  return (
    // <div
    //   className={`${size} menu-item`}
    //   onClick={() => history.push(`${match.url}${linkUrl}`)}
    // >
    //   <div
    //     style={{ backgroundImage: `url(${imageUrl})` }}
    //     className="background-image"
    //   />
    //   <div className="content">
    //     <h1 className="title">{title.toUpperCase()}</h1>
    //     <span className="subtitle">SHOP NOW</span>
    //   </div>
    // </div>
    <MenuItemContainer
      size={size}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <BackgroundImageContainer
        className="background-image"
        imageUrl={imageUrl}
      />
      <ContentContainer className="content">
        <ContentTitle>{title.toUpperCase()}</ContentTitle>
        <ContentSubtitle>SHOP NOW</ContentSubtitle>
      </ContentContainer>
    </MenuItemContainer>
  );
};

export default withRouter(MenuItem);
