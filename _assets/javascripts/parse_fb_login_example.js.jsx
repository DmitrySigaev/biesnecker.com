/** @jsx React.DOM */

FBLoginMessageComponent = new React.createClass({
    render: function() {
        var status = this.props.status;
        var message = '';
        if (status === 'logged_in') {
            message = 'You\'re already logged in.';
        } else if (status === 'not_logged_in') {
            message = 'You\'re not logged in yet.';
        } else {
            message = 'Please wait.'
        }
        return (
            <div>{message}</div>
        );
    }
});

FBLoginButtonComponent = new React.createClass({
    render: function() {
        var button_text = '';
        if (this.props.status === 'logged_in') {
            button_text = 'Log Out';
        } else {
            button_text = 'Log In'
        }
        return (
            <div>
                <button onClick={this.props.clickHandler}>
                    {button_text}
                </button>
            </div>
        );
    }

});

FBLoginComponent = new React.createClass({
    clickHandler: function(e) {
        var _this = this;
        if (this.state.status === 'logged_in') {
            Parse.User.logOut();
            this.setState({
                status: 'not_logged_in',
            });
        } else {
            Parse.FacebookUtils.logIn(null, {
                success: function(user) {
                    _this.setState({
                        status: 'logged_in',
                    });
                },
                error: function(user, error) {
                    _this.setState({
                        status: 'not_logged_in',
                    });
                }
            });
        }
    },
    componentWillMount: function() {
        var currentUser = Parse.User.current();
        console.log(currentUser);
        if (currentUser) {
            this.setState({ status: 'logged_in' });
        } else {
            this.setState({ status: 'not_logged_in' });
        }
    },
    getInitialState: function() {
        return ({
            status: null,
        });
    },
    render: function() {
        return (
            <div id="fb_login_example" className='outline_box'>
                <FBLoginMessageComponent status={this.state.status} />
                <FBLoginButtonComponent
                    status={this.state.status}
                    clickHandler={this.clickHandler} />
            </div>
        );
    },
});


// hook into the fbAsyncInit
if (window.fbAsyncInit.hasRun === true) {
    mountApp();
} else {
    var oldCB = window.fbAsyncInit;
    window.fbAsyncInit = function () {
        if (typeof oldCB === 'function') {
            oldCB();
        }
        mountApp();
    };
}

function mountApp() {
    React.renderComponent(
        <FBLoginComponent />,
        document.getElementById('fb_login_example_mount')
    );
}
