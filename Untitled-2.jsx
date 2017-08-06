App.Users.Add = React.createClass({
  getInitialState: function () {
    return {username: "", email: "", password: "", loading: false, errors: {}}
  },
  _create: function () {
    return $.ajax({
      url: '/api/users',
      type: 'POST',
      data: {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      },
      beforeSend: function () {
        this.setState({loading: true});
      }.bind(this)
    })
  },
  _onSubmit: function (e) {
    e.preventDefault();
    var errors = this._validate();
    if(Object.keys(errors).length != 0) {
      this.setState({
        errors: errors
      });
      return;
    }
    var xhr = this._create();
    xhr.done(this._onSuccess)
    .fail(this._onError)
    .always(this.hideLoading)
  },
  hideLoading: function () {
    this.setState({loading: false});
  },
  _onSuccess: function (data) {
    this.refs.user_form.getDOMNode().reset();
    this.setState(this.getInitialState());
    // show success message
  },
  _onError: function (data) {
    var message = "Failed to create the user";
    var res = data.responseJSON;
    if(res.message) {
      message = data.responseJSON.message;
    }
    if(res.errors) {
      this.setState({
        errors: res.errors
      });
    }
  },
  _onChange: function (e) {
    var state = {};
    state[e.target.name] =  $.trim(e.target.value);
    this.setState(state);
  },
  _validate: function () {
    var errors = {}
    if(this.state.username == "") {
      errors.username = "Username is required";
    }
    if(this.state.email == "") {
      errors.email = "Email is required";
    }
    if(this.state.password == "") {
      errors.password = "Password is required";
    }
    return errors;
  },
  _formGroupClass: function (field) {
    var className = "form-group ";
    if(field) {
      className += " has-error"
    }
    return className;
  },
  render: function() {
    return (
      <div className="form-container">
        <form ref='user_form' onSubmit={this._onSubmit}>
          <div className={this._formGroupClass(this.state.errors.username)}>
            <label className="control-label" for="username">Username </label>
            <input name="username" ref="username" type="text" className="form-control" id="username" placeholder="Username" onChange={this._onChange} />
            <span className="help-block">{this.state.errors.username}</span>
          </div>
          <div className={this._formGroupClass(this.state.errors.email)}>
            <label className="control-label" for="email">Email address</label>
            <input name="email" ref="email" type="email" className="form-control" id="email" placeholder="Email" onChange={this._onChange} />
            <span className="help-block">{this.state.errors.email}</span>
          </div>
          <div className={this._formGroupClass(this.state.errors.password)}>
            <label className="control-label" for="password">Password</label>
            <input name="password" ref="password" type="password" className="form-control" id="password" placeholder="Password" onChange={this._onChange} />
            <span className="help-block">{this.state.errors.password}</span>
          </div>
          <button type="submit" className="btn btn-default" disabled={this.state.loading}>
            Create
            <App.Loading loading={this.state.loading} />
          </button>
        </form>
      </div>
    );
  }
});