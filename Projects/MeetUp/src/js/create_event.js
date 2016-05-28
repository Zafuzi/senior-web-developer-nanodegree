var NameInput = React.createClass({
  render:function(){
    return(
      <div className="row">
        <div className="four columns">
          <label for="event_name_header">Event Name</label>
        </div>
        <div className="six columns">
          <input className="u-full-width" type="text" id="event_name_header" required/>
        </div>
      </div>
    )
  }
})
var HostInput = React.createClass({
  render:function(){
    return(
      <div className="row">
        <div className="four columns">
          <label for="event_host">Event Host</label>
        </div>
        <div className="six columns">
          <input className="u-full-width" type="text" name="event_host" id="event_host" required/>
        </div>
      </div>
    )
  }
})
var TypeInput = React.createClass({
  render:function(){
    return(
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
    )
  }
})
var StartTimeInput = React.createClass({
  render:function(){
    return(
      <div className="row">
        <div className="four columns">
          <label for="event_start_date">Start Time</label>
        </div>
        <div className="six columns">
          <input className="u-full-width" type="datetime-local" name="event_start_date" id="event_start_date" required />
        </div>
      </div>
    )
  }
})
var EndTimeInput = React.createClass({
  render:function(){
    return(
      <div className="row">
        <div className="four columns">
          <label for="event_end_date">End Time</label>
        </div>
        <div className="six columns">
          <input className="u-full-width" type="datetime-local" name="event_end_date" id="event_end_date" required />
        </div>
      </div>
    )
  }
})
var LocationInput = React.createClass({
  render:function(){
    return(
      <div className="row">
        <div className="four columns">
          <label for="event_location_input">Location</label>
        </div>
        <div className="six columns">
          <input className="u-full-width" type="text" id="event_location_input" required/>
          <div className="row" id="event_location"></div>
        </div>
      </div>
    )
  }
})
var OptionalInputs = React.createClass({
  render:function(){
    return(
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
    )
  }
})
var CreateEvent = React.createClass({
  render:function(){
    return(
      <form className="section">
        <h1>New Event Creation Form</h1>
        <NameInput />
        <HostInput />
        <TypeInput />
        <StartTimeInput />
        <EndTimeInput />
        <LocationInput />
        <OptionalInputs />
        <hr/>
        <input className="button button-primary" id="create_event_submit_button" value="Create"/>
      </form>
    )
  }
})

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
ReactDOM.render( <CreateEvent /> , document.getElementById('create_event_form_container'));
