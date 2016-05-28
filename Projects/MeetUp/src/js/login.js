var MenuItem = React.createClass({
  render: function(){
    return(
      <span className={this.props.classes}>
        <a className={this.props.link_class} onclick={this.props.onclick} href={this.props.href}>{this.props.text}</a>
      </span>
    )
  }
})
var Navbar = React.createClass({
  render: function(){
    return(
      <nav className="row navbar">
        <a className="brand u-pull-left" href="index.html">Shindig</a>
        <MenuItem classes="u-pull-left margin-right-50" link_class="button" href="events.html" text="My Events" />
        <MenuItem classes="u-pull-left" link_class="button" href="create_event.html" text="New Event" />
        <MenuItem classes="u-pull-right" link_class="button button-primary" href="register.html" text="Signup" />
      </nav>
    )
  }
});

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
    )}
});


ReactDOM.render( <Navbar /> , document.getElementById('navbar_header'));
ReactDOM.render( <LoginForm /> , document.getElementById('login_form_container'));
