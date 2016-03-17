var MainPage = React.createClass({
  render: function() {
    return (
      <div>

      <section className="bg-primary" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 text-center">
              <h2 className="section-heading">Greatest in world application for Big Bosses!</h2>
              <hr className="light" />
              <p className="text-faded">Helpful application for every ruller who want's know everyrhing about he's employee.</p>
              <a className="btn btn-default btn-xl page-scroll" href="#">Get Started!</a>
            </div>
          </div>
        </div>
      </section>


      <section id="services">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading">At Your Service</h2>
              <hr className="primary" />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 text-center">
              <div className="service-box">
                <i className="fa fa-4x fa-diamond wow bounceIn text-primary" />
                <h3>Hello Boss!</h3>
                <p className="text-muted">Our app will be useful for learning what's making you human!</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="service-box">
                <i className="fa fa-4x fa-paper-plane wow bounceIn text-primary" data-wow-delay=".1s" />
                <h3>It's easy, yep!</h3>
                <p className="text-muted">After registration, u will be brought to amazing word of graphics and calanders and all this just with one-two clicks! Yep, this is real!</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="service-box">
                <i className="fa fa-4x fa-newspaper-o wow bounceIn text-primary" data-wow-delay=".2s" />
                <h3>Work - Everywhere!</h3>
                <p className="text-muted">Application works on all actual platforms and browsers! U can enjoy us app from your gold iPhone of course</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="service-box">
                <i className="fa fa-4x fa-heart wow bounceIn text-danger" data-wow-delay=".3s" />
                <h3>Made with Love</h3>
                <p className="text-muted">You have to make your work with love these days!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    );
  }
});

ReactDOM.render(
  <MainPage />,
  document.getElementById('content')
);