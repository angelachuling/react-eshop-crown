import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';

class App extends React.Component{

  //replaced by props created by mapDispatchToProps and mapStateToProps
  // constructor() {
  //   super();
    
  //   this.state = {
  //     currentUser: null
  //   }
  // };

  //a class property. not required to declare const.
  //to store firebase.Unsubscribe when user logs in or subscribes. later when user logs out/unsubscribes, it will be called by componentWillUnmount(){this.unsubscribeFromAuth();} => firebase.Unsubscribe()
  unsubscribeFromAuth = null;

  //subscribe
  //when user login/subscribe, user is logged in and this.unsubscribeFromAuth = firebase.Unsubscribe; and an object userAuth containing user info is created.
  componentDidMount(){

    //this.props
    console.log('componentDidMount: this.props', this.props);
    const{setCurrentUser} = this.props;

    console.log('running componentDidMount');
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //console.log('componentDidMount: running auth.onAuthStateChanged')
      if(userAuth){
        console.log('userAuth is produced', userAuth);
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          //console.log('componentDidMount: gets userRef from createUserProfileDocument and creates snapShot2',snapShot); //it doesnt have the user data from db. unless call snapShot.data()
          //console.log('componentDidMount: snapShot.data()', snapShot.data());
          //setState is asynchronous

          //create user.action object with current user data and dispatch action to middleware then create store then render the corresponding part 
          setCurrentUser({
            id: snapShot.id,
              ...snapShot.data()
          });
          console.log('this.props.currentUser', this.props.currentUser);
          /*this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => {
            console.log('componentDidMount: setSate with new user data. check this.state', this.state);
          })
          */
        });
      } else{
        //if user is not signed in or signs out, userAuth is null
        console.log('userAuth is null');
        //this.setState({currentUser: userAuth});
        setCurrentUser(userAuth);
      } 
    })
  }

  //unsubscribe
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  
  render() {

    console.log('app.js page rendering');
    return(
      <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route 
          exact 
          path='/signin' 
          render={() => 
            //data from mapStateToProps
            this.props.currentUser? (
              <Redirect to='/' />
            ) : (
              <SignInAndSignUpPage />
            )
          } 
        />
      </Switch>
    </div>
    )

    // return(
    //   <div>
    //   <Header currentUser={this.state.currentUser} />
    //   <Switch>
    //   <Route exact path='/' component={HomePage} />
    //   <Route path='/shop' component={ShopPage} />
    //   <Route path='/signin' component={SignInAndSignUpPage} />
    //   </Switch>
    // </div>
    // )
  };
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

/*
same as
const mapStateToProps = state => ({
       currentUser: state.user.currentUser
});

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

*/

//to dispatch action to redux store and to do state modification
//it gives dispacher for action as a prop.
const mapDispatchToProps = dispatch =>({
  //setCurrentUser(user)= {type: 'SET_CURRENT_USER',payload: user}
  setCurrentUser: user => dispatch(setCurrentUser(user))
}) 
export default connect(mapStateToProps,mapDispatchToProps)(App);



/*auth.onAuthStateChanged(...) is a listener and we attach it to auth when our App component is mounted. And now whenever we sign-in or sign-out this function will be called as it is listening for such events
 the auth.onAuthStateChanged(...)  returns a function. You can try doing console.log(this.unsubscribeFromAuth)  and see that a function is returned.
 So basically the this.unsubscribeFromAuth kind of becomes this.unsubscribeFromAuth = function(....){...}  .
 And when we execute the function by attaching the parentheses ()  to the this.unsubscribeFromAuth() , the function that the auth.onAuthStateChanged(...) returned and got assigned to this.unsubscribeFromAuth gets called and hence the channel gets closed. Hope it helps clarify.
*/