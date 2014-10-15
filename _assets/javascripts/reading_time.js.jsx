/** @jsx React.DOM */

var ReadingTimeWidget = React.createClass({
    getInitialState: function() {
        return ({
            secondsRequired: null,
        });
    },
    componentWillMount: function() {
        var cdiv = this.props.contentDiv;
        var wpm = 250;
        if (typeof this.props.wpm !== 'undefined') {
            wpm = this.props.wpm;
        }
        var text = cdiv.text()
                       .replace(/\s+/g, ' ')
                       .split(' ')
                       .filter(function(e) {
                           return (e.length > 1);
                       });
        this.setState({ secondsRequired: Math.round(text.length / wpm * 60) });
    },
    render: function() {
        var message = '';
        if (this.state.secondsRequired !== null) {
            var seconds = this.state.secondsRequired;
            var minutes = Math.round(seconds / 60);
            message = minutes + ' minute read';
        } else {
            message = 'Calculating reading time...';
        }
        return (
            <span id='reading_time'>
                <span className='iconic clock' />&nbsp;
                {message}
            </span>
        );
    }
});

$(document).ready(function() {
    var mountPoint = $('#reading_time_mount');
    if (mountPoint) {
        var contentDiv = $('#main_content');

        React.renderComponent(
            <ReadingTimeWidget contentDiv={contentDiv} wpm={200} />,
            mountPoint.get(0));
    }
});
