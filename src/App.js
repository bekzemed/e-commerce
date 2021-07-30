import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
// HOC that give it access to the redux to our component
import { connect } from 'react-redux';
// import { fetchUserStartAsync, setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import Header from './components/header/header.component';

import ShopPage from './pages/shop/shop.component';
import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { createStructuredSelector } from 'reselect';
import { checkUserSession } from './redux/user/user.actions';

const App = ({ checkUserSession, currentUser }) => {
  // unsubscribeFromAuth = null;

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  //  componentDidMount() {
  //   checkUserSession();
  // const { fetchUserStartAsync } = this.props;
  // this.unsubscribeFromAuth =
  // fetchUserStartAsync();
  // open subscription
  // app listen to state changed on firebase auth
  // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  //   // this.setState({currentUser: userAuth});
  //   // console.log(userAuth);
  //   if (userAuth) {
  //     const userRef = await createUserProfileDocument(userAuth);
  //     // fetching the data stored in db
  //     // listens to every change in our firestore document
  //     userRef.onSnapshot(snapshot => {
  //       setCurrentUser({ id: snapshot.id, ...snapshot.data() });
  //       // this.setState({
  //       //   currentUser: {
  //       //     id: snapshot.id,
  //       //     ...snapshot.data(),
  //       //   },
  //       // });
  //       // setState is async so its not guaranted to call it(console) after setState what we can do is pass log into second argument of setState
  //       // console.log(snapshot.data());
  //       // console.log(this.state);
  //     });
  //   }
  //   // if user is null
  //   setCurrentUser(userAuth);
  //   // this.setState({ currentUser: userAuth });
  //   // it helps us to populate shop data into firestore
  //   // addCollectionAndDocument(
  //   //   'collections',
  //   //   collectionArray.map(({ title, items }) => ({ title, items }))
  //   // );
  // });
  // }

  // componentWillUnmount() {
  //   // close subscription to reduce memory leak
  //   this.unsubscribeFromAuth();
  // }

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
        <Route exact path="/checkout" component={CheckoutPage} />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionArray: selectShopCollectionsForPreview,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
