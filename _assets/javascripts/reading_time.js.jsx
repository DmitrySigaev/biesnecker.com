/** @jsx React.DOM */

var ReadingTimeWidget = React.createClass({
    getInitialState: function() {
        return ({
            secondsRequired: null,
        });
    },
    componentWillMount: function() {
        var cdiv = this.props.contentDiv;
        var text = cdiv.text().replace(/\s+/g, ' ').split(' ');
        var blacklist = ["'", '"', '.', ',', ':', '--', '{%', '%}', '=', '==',
            '!=', '>', '<', '^', '//', '/', '-'];
        var idx = 0;
        for (var i = 0; i < blacklist.length; i++) {
            idx = text.indexOf(blacklist[i]);
            while (idx != -1) {
                text.splice(idx, 1);
                idx = text.indexOf(blacklist[i]);
            }
        }
        var filteredText = text.filter(function(e) {
            return (e.length > 2);
        });
        this.setState({ secondsRequired: Math.round(filteredText.length / 275 * 60) });
    },
    render: function() {
        var message = '';
        if (this.state.secondsRequired) {
            var seconds = this.state.secondsRequired;
            var minutes = Math.floor(seconds / 60);
            if (seconds % 60 > 20) {
                minutes++
            }
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
    console.log(mountPoint);
    if (mountPoint) {
        var contentDiv = $('#main_content');

        React.renderComponent(
            <ReadingTimeWidget contentDiv={contentDiv} />,
            mountPoint.get(0));
    }
});
