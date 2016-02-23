var MainPage = React.createClass({
  render: function() {
    return (
      <div>
        <div className="jumbotron">
          <h1>Greatest in world application for Big Bosses!</h1>
          <p className="lead">Helpful application for every ruller who want's know everyrhing about he's employee.</p>
          <p><a className="btn btn-primary btn-lg" id="tstbtnPlumb" href="#something">Learn more »</a></p>
        </div>
        <div className="row">
          <div className="col-md-4">
            <h2>Hello Boss!</h2>
            <p>Our app will be useful for learning what's making you human!</p>
            <p>
                <a className="btn btn-default" href="#SomeInfo">Learn more »</a>
            </p>
          </div>
          <div className="col-md-4">
            <h2>It's easy, yep!</h2>
            <p>After registration, u will be brought to amazing word of graphics and calanders and all this just with one-two clicks! Yep, this is real!</p>
            <p>
                <a className="btn btn-default" href="#ShowThis">Learn more »</a>
            </p>
          </div>
          <div className="col-md-4">
            <h2>Work - Everywhere!</h2>
            <p>Application works on all actual platforms and browsers! U can enjoy us app from your gold iPhone of course!</p>
            <p>
                <a className="btn btn-default" href="#SomithingShow">Learn more »</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <MainPage />,
  document.getElementById('content')
);