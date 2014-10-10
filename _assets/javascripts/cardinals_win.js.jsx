/** @jsx React.DOM */

var States = {
    loading: 1,
    broken: 0,
    noGame: 2,
    inProgress: 3,
    wonGame: 4,
    lostGame: 5,
};

var CardinalsWinCard = React.createClass({
    getInitialState: function() {
        return {
            today_state: 'STL'
        };
    },
    render: function() {
        return(
            <div id='cardinals-win-card'>

            </div>
        );
    }
});

React.renderComponent(
    <CardinalsWinCard />,
    document.getElementById('cardinals-win')
);
