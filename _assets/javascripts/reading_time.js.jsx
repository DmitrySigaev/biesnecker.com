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
            minutes = minutes < 1 ? 1 : minutes;
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
    var contentDiv = $('#main_content');

    React.render(
        <ReadingTimeWidget contentDiv={contentDiv} wpm={200} />,
        document.getElementById('reading_time_mount'));
});
