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
    var loginButton;
    if (loggedIn) {
      loginButton = <MenuItem classes="u-pull-right margin-right-50" link_class="button" href="login.html" text="Login" />;
    } else {
      loginButton = <MenuItem classes="u-pull-right margin-right-50" link_class="button" click_function="logout();" text="Logout" />;
    }
    return(
      <nav className="row navbar">
        <a className="brand u-pull-left" href="index.html">Shindig</a>
        <MenuItem classes="u-pull-left margin-right-50" link_class="button" href="events.html" text="My Events" />
        <MenuItem classes="u-pull-left" link_class="button" href="create_event.html" text="New Event" />
        {loginButton}
        <MenuItem classes="u-pull-right" link_class="button button-primary" href="register.html" text="Signup" />
      </nav>
    )
  }
});

ReactDOM.render( <Navbar /> , document.getElementById('header'));
