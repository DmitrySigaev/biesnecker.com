/** @jsx React.DOM */

var PitchCalculator = React.createClass({
    calculate: function(d, t, v, a) {
        return d + (v * t) + (0.5 * a * t * t);
    },
    render: function() {
        var points = [];
        var _x, _y, _z;
        var t = 0;  // in milliseconds
        var passed_plate_front = false;
        var passed_plate_back  = false;
        do {
            var t_ms = t / 1000;
            _x = this.calculate(this.props.x, t_ms, this.props.vx, this.props.ax);
            _y = this.calculate(this.props.y, t_ms, this.props.vy, this.props.ay);
            _z = this.calculate(this.props.z, t_ms, this.props.vz, this.props.az);
            points.push(
                <tr key={t}>
                    <td>{t_ms}</td>
                    <td>{_x.toFixed(4)}</td>
                    <td>{_y.toFixed(4)}</td>
                    <td>{_z.toFixed(4)}</td>
                </tr>
            );
            t += this.props.interval || 25;
        } while (_y > 0 && _z > 0);

        return (
            <table>
                <tr>
                    <th>t</th>
                    <th>x</th>
                    <th>y</th>
                    <th>z</th>
                </tr>
                {points}
            </table>
        );
    }
});

React.renderComponent(
    <PitchCalculator
        x={-0.736549975}
        y={55}
        z={6.393668382}
        vx={1.676496827}
        vy={-114.4539208}
        vz={1.664495387}
        ax={8.258000427}
        ay={25.12500049}
        az={-43.31700143}
        interval={25} />,
    document.getElementById('sample_calculation')
);
