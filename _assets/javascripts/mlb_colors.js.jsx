/** @jsx React.DOM */

var color_data = {
    'American': {
        'East': [
            {
                'shortname': 'BAL',
                'longname': 'Baltimore Orioles',
                'colors': [
                    '#ED4C09',
                    '#000000',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'BOS',
                'longname': 'Boston Red Sox',
                'colors': [
                    '#C60C30',
                    '#002244',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'NYY',
                'longname': 'New York Yankees',
                'colors': [
                    '#1C2841',
                    '#FFFFFF',
                    '#808080',
                ]
            },
            {
                'shortname': 'TB',
                'longname': 'Tampa Bay Rays',
                'colors': [
                    '#00285D',
                    '#9ECEEE',
                    '#FFFFFF',
                    '#FFD700',
                ]
            },
            {
                'shortname': 'TOR',
                'longname': 'Toronto Blue Jays',
                'colors': [
                    '#003DA5',
                    '#041E42',
                    '#FFFFFF',
                    '#DA291C',
                ]
            },
        ],
        'Central': [
            {
                'shortname': 'CWS',
                'longname': 'Chicago White Sox',
                'colors': [
                    '#000000',
                    '#C0C0C0',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'CLE',
                'longname': 'Cleveland Indians',
                'colors': [
                    '#003366',
                    '#D30335',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'DET',
                'longname': 'Detroit Tigers',
                'colors': [
                    '#001742',
                    '#FFFFFF',
                    '#DE4406',
                ]
            },
            {
                'shortname': 'KC',
                'longname': 'Kansas City Royals',
                'colors': [
                    '#15317E',
                    '#74B4FA',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'MIN',
                'longname': 'Minnesota Twins',
                'colors': [
                    '#072754',
                    '#C6011F',
                    '#FFFFFF',
                ]
            },
        ],
        'West': [
            {
                'shortname': 'HOU',
                'longname': 'Houston Astros',
                'colors': [
                    '#072854',
                    '#FF7F00',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'LAA',
                'longname': 'LA Angels of Anaheim',
                'colors': [
                    '#B71234',
                    '#002244',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'OAK',
                'longname': 'Oakland Athletics',
                'colors': [
                    '#003831',
                    '#FFD800',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'SEA',
                'longname': 'Seattle Mariners',
                'colors': [
                    '#0C2C56',
                    '#005C5C',
                    '#C0C0C0',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'TEX',
                'longname': 'Texas Rangers',
                'colors': [
                    '#BD1021',
                    '#FFFFFF',
                    '#003279',
                ]
            },
        ],
    },
    'National': {
        'East': [
            {
                'shortname': 'ATL',
                'longname': 'Atlanta Braves',
                'colors': [
                    '#002F5F',
                    '#B71234',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'MIA',
                'longname': 'Miami Marlins',
                'colors': [
                    '#000000',
                    '#F9423A',
                    '#8A8D8F',
                    '#0077C8',
                    '#FFD100',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'NYM',
                'longname': 'New York Mets',
                'colors': [
                    '#002C77',
                    '#FB4F14',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'PHI',
                'longname': 'Philadelphia Phillies',
                'colors': [
                    '#BA0C2F',
                    '#FFFFFF',
                    '#003087',
                ]
            },
            {
                'shortname': 'WAS',
                'longname': 'Washington Nationals',
                'colors': [
                    '#BA122B',
                    '#11225B',
                    '#FFFFFF',
                ]
            },
        ],
        'Central': [
            {
                'shortname': 'CHC',
                'longname': 'Chicago Cubs',
                'colors': [
                    '#003279',
                    '#CC0033',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'CIN',
                'longname': 'Cincinnati Reds',
                'colors': [
                    '#C6011F',
                    '#FFFFFF',
                    '#000000',
                ]
            },
            {
                'shortname': 'MIL',
                'longname': 'Milwaukee Brewers',
                'colors': [
                    '#182B49',
                    '#92754C',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'PIT',
                'longname': 'Pittsburgh Pirates',
                'colors': [
                    '#000000',
                    '#FDB829',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'STL',
                'longname': 'St. Louis Cardinals',
                'colors': [
                    '#C41E3A',
                    '#0A2252',
                    '#FFFFFF',
                ]
            },
        ],
        'West': [
            {
                'shortname': 'ARI',
                'longname': 'Arizona Diamondbacks',
                'colors': [
                    '#A71930',
                    '#000000',
                    '#DBCEAC',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'COL',
                'longname': 'Colorado Rockies',
                'colors': [
                    '#000000',
                    '#333366',
                    '#C0C0C0',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'LAD',
                'longname': 'Los Angeles Dodgers',
                'colors': [
                    '#083C6B',
                    '#FFFFFF',
                ]
            },
            {
                'shortname': 'SD',
                'longname': 'San Diego Padres',
                'colors': [
                    '#002147',
                    '#FFFFFF',
                    '#B4A76C',
                ]
            },
            {
                'shortname': 'SF',
                'longname': 'San Francisco Giants',
                'colors': [
                    '#000000',
                    '#F2552C',
                    '#FFFDD0',
                ]
            },
        ],
    },
};

var TeamCell = React.createClass({
    handleClick: function(e) {
        this.props.onUpdate(this.props.team['shortname']);
    },
    render: function() {
        var cellstyle = {
            'textAlign': 'center',
            'color': '#FFFFFF',
            'backgroundColor': this.props.team['colors'][0],
        };
        var spanstyle = {
            'cursor': 'pointer',
        }
        return (
            <td style={cellstyle}>
                <span onClick={ this.handleClick } style={spanstyle}>
                    {this.props.team['shortname']}
                </span>
            </td>
        );
    }
});

var DivisionMenuRow = React.createClass({
    render: function() {
        var height = 3;
        var onUpdate = this.props.onUpdate
        cells = []
        cells.push(
            <td key={this.props.div}>{this.props.div}</td>
        );
        for (var idx = 0; idx < this.props.teams.length; idx++) {
            cells.push(
                <TeamCell
                    key={this.props.teams[idx]['shortname']}
                    team={this.props.teams[idx]}
                    onUpdate={onUpdate} />
            );
        }
        return (<tr>{cells}</tr>);
    }
});

var TeamMenu = React.createClass({
    render: function() {
        var divisions = ['East', 'Central', 'West'];
        var onUpdate = this.props.onUpdate;
        var drows = [];
        for (var i = 0; i < divisions.length; i++) {
            var d = divisions[i];
            var dat = this.props.data;
            var teams = dat['American'][d].concat(dat['National'][d]);
            drows.push(
                <DivisionMenuRow key={d} div={d} teams={teams} onUpdate={onUpdate} />
            );
        }
        var tablestyle = {
            'fontSize': '75%'
        }
        return (
            <table style={tablestyle}>
                <thead>
                <tr>
                    <td>&nbsp;</td>
                    <th colSpan="5">American</th>
                    <th colSpan="5">National</th>
                </tr>
                </thead>
                <tbody>
                    {drows}
                </tbody>
            </table>
        );
    }
});

var ColorCell = React.createClass({
    render: function() {
        var color = this.props.color;
        var text_color = "#FFFFFF";
        var text_shadow = '1px 1px #000000'
        if (this.props.color == '#FFFFFF' ||
                this.props.color == '#FFFDD0') {
            text_color = "#000000";
            text_shadow = '1px 1px #AAAAAA';
        }
        var cellstyle = {
            'color': text_color,
            'textShadow': text_shadow,
            'backgroundColor': color,
            'textAlign': 'center',
        };
        return (
            <td width="33.33%" style={cellstyle}>{color}</td>
        )
    }

})

var ColorGrid = React.createClass({
    render: function() {
        var grid;
        var team_code = this.props.team;
        var colors = this.props.colors;
        switch(colors.length) {
            case 1:
                grid = <tr>
                    <ColorCell key={team_code + '1'} color={ colors[0] } />
                    <td key={team_code + '2'}>&nbsp;</td>
                    <td key={team_code + '3'}>&nbsp;</td>
                </tr>;
                break;
            case 2:
                grid = <tr>
                    <ColorCell key={team_code + '1'} color={ colors[0] } />
                    <ColorCell key={team_code + '2'} color={ colors[1] } />
                    <td key={team_code + '3'}>&nbsp;</td>
                </tr>;
                break;
            default:
                grid = <tr>
                    <ColorCell key={team_code + '1'} color={ colors[0] } />
                    <ColorCell key={team_code + '2'} color={ colors[1] } />
                    <ColorCell key={team_code + '3'} color={ colors[2] } />
                </tr>;
                break;
        }
        return grid;
    }
});

var ColorSwatch = React.createClass({
    render: function() {
        var team_code = this.props.current_team;
        var team_data = this.props.teams[team_code];
        var rows = []
        rows.push(
            <ColorGrid
                key="0"
                team={team_code}
                colors={ team_data['colors'].slice(0,3) } />
        );
        if (team_data['colors'].length > 3) {
            rows.push(
                <ColorGrid
                    key="1"
                    team={team_code}
                    colors={ team_data['colors'].slice(3,6) } />
            );
        }

        return (
            <div>
                <h3>{ team_data['longname'] }</h3>
                <table>
                    {rows}
                </table>
            </div>
        );
    }
});

var ColorDashboard = React.createClass({
    getInitialState: function() {
        return {
            team_code: 'STL'
        };
    },
    handleClick: function(team_code) {
        this.setState({
            'team_code': team_code,
        });
    },
    render: function() {
        var leagues = ['American', 'National'];
        var divisions = ['East', 'Central', 'West'];
        var teams = {}
        for (var i = 0; i < leagues.length; i++) {
            for (var j = 0; j < divisions.length; j++) {
                var div_teams = this.props.data[leagues[i]][divisions[j]];
                for (var k = 0; k < div_teams.length; k++) {
                    var team_shortname = div_teams[k]['shortname'];
                    teams[team_shortname] = div_teams[k];
                }
            }
        }

        return (
            <div id='color-dashboard'>
                <TeamMenu
                    data={this.props.data}
                    onUpdate={this.handleClick} />
                <ColorSwatch
                    current_team={this.state.team_code}
                    teams={teams} />
            </div>
        );
    }
});

React.render(
    <ColorDashboard data={color_data} />,
    document.getElementById('mlb-colors-root')
);
