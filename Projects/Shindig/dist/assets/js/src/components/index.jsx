var path = location.href.replace(/(.+\w\/)(.+)/,"/$2");
console.log(path);
document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

/* MenuItem - Buttons to go in the navbar
--------------------------------------------- */
var MenuItem = React.createClass({
  render: function(){
    return(
      <span className={this.props.classes}>
        <a className={this.props.link_class} href={this.props.href}>{this.props.text}</a>
      </span>
    );
  }
});

/* Navbar
--------------------------------------------- */
var Navbar = React.createClass({
  render: function(){
    var loginButton, signupButton, myEventsButton, newEventButton;

    if (document.cookie == "false") {
      loginButton = <MenuItem classes="u-pull-right margin-right-50" link_class="button" href="login.html" text="Login" />;
      signupButton = <MenuItem classes="u-pull-right" link_class="button button-primary" href="register.html" text="Signup" />;
      myEventsButton = null;
      newEventButton = null;
    } else {
      loginButton = <MenuItem classes="u-pull-right margin-right-50" link_class="button logout_button" text="Logout"/>;
      signupButton = null;
      myEventsButton = <MenuItem classes="u-pull-left margin-right-50" link_class="button" href="events.html" text="My Events" />;
      newEventButton = <MenuItem classes="u-pull-left" link_class="button" href="create_event.html" text="New Event" />;
    }
    return(
      <nav className="row navbar">
        <a className="brand u-pull-left" href="index.html">Shindig</a>
        {myEventsButton}
        {newEventButton}
        {signupButton}
        {loginButton}
      </nav>
    );
  }
});

/* Landing Page
--------------------------------------------- */
var LandingPage = React.createClass({
  render: function(){
    return(
      <div className="section banner_one">
        <div className="container">
          <div className="row">
            <div className="twelve columns text-center banner_message">
              <h2 className="banner_header">shindig <span className="banner_sub_header">events</span> </h2>
              <p className="banner_description">The simplest way to create and track events on all your devices.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

/* Landing Page Information
--------------------------------------------- */
var MainContent = React.createClass({
  render: function(){
    return(
      <div>
        <div className="container">
          <div className="row section">
            <div className="twelve columns text-center">
              <a href="register.html" className="button button-primary">Get Started</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

/* Registration
--------------------------------------------- */
var Register = React.createClass({
  render: function(){
    return (
      <form className="section text-left" id="register_form" autocomplete="on">
        <h1>Sign Up</h1>
        <hr/>

        {/* Name*/}
        <div className="row">
          <div className="four columns">
            <label for="register_name">Name</label>
          </div>
          <div className="six columns">
            <input className="u-full-width" type="text" name="fname" required minlength="3" autofocus="" autocomplete="on" id="register_name"/>
          </div>
        </div>

        {/* Email */}
        <div className="row">
          <div className="four columns">
            <label for="regist_email">Email</label>
          </div>
          <div className="six columns">
            <input className="u-full-width" type="email" name="email" required pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" inputmode="email" id="register_email" />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="row">
            <div className="four columns">
              <label for="register_password">Password</label>
            </div>
            <div className="six columns">
              <input className="u-full-width" id="register_password" type="password" name="password_one" required />
            </div>
          </div>
          <div className="row">
            <div className="four columns">
              <label for="register_password_2">Repeat Password</label>
            </div>
            <div className="six columns">
              <input className="u-full-width" id="register_password_2" type="password" name="password_two" required />
            </div>
          </div>
        </div>

        {/*Collapse Module*/}
        <div className="row text-center">
          <input type="button" className="button" id="collapse_toggle" value="Add More" />
        </div>
        <div className="collapse">
          <div className="row">
            <div className="four columns">
              <label for="register_employer">Employeer</label>
            </div>
            <div className="six columns">
              <input className="u-full-width" type="text" name="employer" id="register_employer" />
            </div>
          </div>
          <div className="row">
            <div className="four columns">
              <label for="register_job_title">Job Title</label>
            </div>
            <div className="six columns">
              <input className="u-full-width" type="text" name="title" id="register_job_title" />
            </div>
          </div>
          <div className="row">
            <div className="four columns">
              <label for="register_birthday">Birthday</label>
            </div>
            <div className="six columns">
              <input className="u-full-width" type="date" name="title" id="register_birthday" />
            </div>
          </div>
        </div>

        <hr/>
        <div className="row text-center">
          <input type="button" className="button button-primary" id="register_submit" value="Register"/>
        </div>
      </form>
    );
  }
});

/* Login
--------------------------------------------- */
var LoginForm = React.createClass({
  render: function(){
    return(
      <div className="container text-center">
        <form className="section">

          <div className="row">
            <div className="four columns">
              <label for="login_email">Email</label>
            </div>
            <div className="six columns">
              <input className="u-full-width" type="text" name="fname" required autofocus autocomplete="on" id="login_email"/>
            </div>
          </div>

          <div className="row">
            <div className="four columns">
              <label for="login_password">Password</label>
            </div>
            <div className="six columns">
              <input className="u-full-width" type="password" required autofocus autocomplete="on" id="login_password"/>
            </div>
          </div>

          <div className="row">
            <label for="remember_me">
              <input type="checkbox" id="remember_me"/>
              &nbsp;
              Remember My Email
            </label>
          </div>

          <div className="row">
            <input type="button" className="button button-primary" id="login_button" value="Sign In"/>
          </div>

        </form>
      </div>
    );
  }
});

/* Create Event
--------------------------------------------- */
var CreateEvent = React.createClass({
  render:function(){
    return(
      <form className="section">
        <h1>New Event Creation Form</h1>

        {/* Event Name */}
        <div className="row">
          <div className="four columns">
            <label for="event_name_header">Event Name</label>
          </div>
          <div className="six columns">
            <input className="u-full-width" type="text" id="event_name_header" required/>
          </div>
        </div>

        {/* Event Host */}
        <div className="row">
          <div className="four columns">
            <label for="event_host">Event Host</label>
          </div>
          <div className="six columns">
            <input className="u-full-width" type="text" name="event_host" id="event_host" required/>
          </div>
        </div>

        {/* Event Type */}
        <div className="row">
          <div className="four columns">
            <label for="event_type">Event Type</label>
          </div>
          <div className="six columns">
            <input className="u-full-width" list="event_type_list" id="event_type" required/>
            <datalist id="event_type_list">
              <option value="Party"></option>
              <option value="Meeting"></option>
              <option value="Adventure"></option>
            </datalist>
          </div>
        </div>

        {/* Event Start Time */}
        <div className="row">
          <div className="four columns">
            <label for="event_start_date">Start Time</label>
          </div>
          <div className="six columns">
            <input className="u-full-width" type="datetime-local" name="event_start_date" id="event_start_date" required />
          </div>
        </div>

        {/* Event End Time */}
        <div className="row">
          <div className="four columns">
            <label for="event_end_date">End Time</label>
          </div>
          <div className="six columns">
            <input className="u-full-width" type="datetime-local" name="event_end_date" id="event_end_date" required />
          </div>
        </div>

        {/* Event Location */}
        <div className="row">
          <div className="four columns">
            <label for="event_location_input">Location</label>
          </div>
          <div className="six columns">
            <input className="u-full-width" type="text" id="event_location_input" required/>
            <div className="row" id="event_location"></div>
          </div>
        </div>

        {/* Event Message and Guest List */}
        <div className="row text-center">
          <input type="button" className="button" id="collapse_toggle" value="Add More" />
        </div>
        <div className="collapse row" id="add_more_to_event">
          <div className="row">
            <div className="four columns">
              <label for="event_message">Add a Message</label>
            </div>
            <div className="six columns">
              <textarea className="u-full-width" name="event_message" id="event_message"></textarea>
            </div>
          </div>

          <div className="row">
            <div className="four columns">
              <label for="event_guests">Guest List</label>
            </div>
            <div className="six columns">
              <textarea className="u-full-width" name="event_guests" id="event_guests"></textarea>
            </div>
          </div>
        </div>

        <hr/>
        <a className="button button-primary" id="create_event_submit_button">Create</a>
      </form>
    );
  }
});

/* Determine Login Status - Not working
--------------------------------------------- */
ReactDOM.render( <Navbar /> , document.getElementById('navbar_header'));

/* Render Switch
--------------------------------------------- */
switch(path){
  case 'http://localhost:3000/':
    renderLandingPage();
    break;

  case '/index.html':
    renderLandingPage();
    break;

  case '/register.html':
    ReactDOM.render( <Register /> , document.getElementById('register_form_container'));
    break;

  case '/login.html':
    ReactDOM.render( <LoginForm /> , document.getElementById('login_form_container'));
    break;

  case '/create_event.html':
    ReactDOM.render( <CreateEvent /> , document.getElementById('create_event_form_container'));
    break;

  case '':
    renderLandingPage();
    break;
}

// Renders the landing page
function renderLandingPage(){
  ReactDOM.render( <LandingPage /> , document.getElementById('landing'));
  ReactDOM.render( <MainContent /> , document.getElementById('content'));
}
