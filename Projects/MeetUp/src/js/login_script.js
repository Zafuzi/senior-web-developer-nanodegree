var Navbar = React.createClass({
  render: function(){
    return(
      <nav className="row navbar">
        <span className="brand">Shindig</span>
        <span className="u-pull-right margin-right-25">
          <a className="button" href="login.html">Login</a>
        </span>
      </nav>
    )
  }
});

var RegisterName = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="four columns">
          <label for="register_name">Name</label>
        </div>
        <div className="six columns">
          <input className="u-full-width" type="text" name="fname" required minlength="3" autofocus="" autocomplete="on" id="register_name"/>
        </div>
      </div>
    )
  }
})

var RegisterEmail = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="four columns">
          <label for="regist_email">Email</label>
        </div>
        <div className="six columns">
          <input className="u-full-width" type="email" name="email" required pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" inputmode="email" id="register_email" />
        </div>
      </div>
    )
  }
})

var RegisterPassword = React.createClass({
  render: function(){
    return(
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
    )
  }
})

var RegisterInfo = React.createClass({
  render: function(){
    return(
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
    )
  }
})

var RegisterForm = React.createClass({
  render: function(){
    return(
      <form className="section text-left" id="register_form" autocomplete="on">
        <h1>Sign Up</h1>
        <hr/>
        <RegisterName />
        <RegisterEmail />
        <RegisterPassword />
        <div className="row text-center">
          <input type="button" className="button" id="collapse_toggle" value="Add More" />
        </div>
        <RegisterInfo />
        <hr/>
        <div className="row text-center">
          <input type="button" className="button button-primary" id="register_submit" value="Register"/>
        </div>
      </form>
    )
  }
});

ReactDOM.render( <Navbar /> , document.getElementById('navbar_header'));
ReactDOM.render( <RegisterForm /> , document.getElementById('register_form_container'));

// REVIEW check over registeration html
