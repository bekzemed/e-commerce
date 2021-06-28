import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
// HOC that give it access to the redux to our component
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import Header from './components/header/header.component';

import ShopPage from './pages/shop/shop.component';
import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { createStructuredSelector } from 'reselect';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    // open subscription
    // app listen to state changed on firebase auth
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({currentUser: user});
      // console.log(user);

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // fetching the data stored in db
        userRef.onSnapshot(snapshot => {
          setCurrentUser({ id: snapshot.id, ...snapshot.data() });
          // this.setState({
          //   currentUser: {
          //     id: snapshot.id,
          //     ...snapshot.data(),
          //   },
          // });
          // setState is async so its not guaranted to call it(console) after setState what we can do is pass log into second argument of setState
          // console.log(snapshot.data());

          // console.log(this.state);
        });
      }
      // if user is null
      else {
        // this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    // close subscription to reduce memory leak
    this.unsubscribeFromAuth();
  }

  render() {
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
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
