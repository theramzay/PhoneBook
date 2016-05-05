var ReactFitText = require('react-fittext'); //TODO: wait for bug fix and enable fitter https://github.com/gianu/react-fittext/issues/13

module.exports = React.createClass({
  componentDidMount: function() {
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );
  },
  render: function() {
    return (
      <div className="header-content">
        <div className="header-content-inner">
          <h1>Phone Book</h1>
          <hr />
          <p>We are thinking when your are dreaming!</p>
          <a href="#content" id="to-down">
            <i className="fa fa-arrow-down" />
          </a>
        </div>
      </div>
    );
  }
});
