var ChangePassword = require('./ChangePassword');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            c: false
    };
    },
    loadFromServer: function() {
        var self = this;
        var tokenKey = "tokenInfo";
        var token = $.cookie(tokenKey);
        $.ajax({
            headers: {
                'Authorization': "bearer " + token,
                'Content-Type': "application/json"
            },
            type: "GET",
            url: this.props.url
        }).success(function(data) {
            self.setState({
                FirstName: data.FirstName,
                MiddleName: data.MiddleName,
                LastName: data.LastName,
                PositionInCompany: data.PositionInCompany,
                PhonePrivate: data.PhonePrivate,
                PhoneWork: data.PhoneWork,
                Notes: data.Notes,
                Boss: data.Boss,
                PathToPhoto: data.PathToPhoto,
                PathToTmbOfPhoto: data.PathToTmbOfPhoto,
                HolidayTimeStart: data.HolidayTimeStart,
                HolidayTimeEnd: data.HolidayTimeEnd
            });
            self.setProps({ changed: false }); //TODO: do it with State
        }).fail(function() {
            alert("Error");
        });
    },
    componentDidMount: function () {
        this.loadFromServer();
        console.log(this.props.url);
    },
    componentDidUpdate: function (prevProps, prevState) {
        if (this.props.changed) {
            this.loadFromServer();
        }
    },
    UploadImage: function() {
        if (this.state.c) {
            ReactDOM.unmountComponentAtNode(document.getElementById('Settings'));
            this.state.c = false;
        } else {
            ReactDOM.render(
       <ImageUpload url="api/Account/Upload"/>,
       document.getElementById("Settings")
);
            this.state.c = true;
        }
    },
    ChangePassword: function () {
        if (this.state.c) {
            ReactDOM.unmountComponentAtNode(document.getElementById('Settings'));
            this.state.c = false;
        } else {
            ReactDOM.render(
       <ChangePassword url="api/Account/ChangePassword"/>,
       document.getElementById("Settings")
        );
            this.state.c = true;
        }
    },
    EditInfo: function () {
        if (this.state.c) {
            ReactDOM.unmountComponentAtNode(document.getElementById('Settings'));
            this.state.c = false;
        } else {
            ReactDOM.render(
    <EditInfo FirstName={this.state.FirstName}
        MiddleName={this.state.MiddleName} 
        LastName={this.state.LastName} 
        PositionInCompany={this.state.PositionInCompany} 
        PhonePrivate={this.state.PhonePrivate} 
        PhoneWork={this.state.PhoneWork} 
        Notes={this.state.Notes} 
        url="api/Account/UpdateAllUserInfo"/>,
document.getElementById("Settings")
        );
        this.state.c = true;
    }
    },
    AddClaim: function () {
        if (this.state.c) {
            ReactDOM.unmountComponentAtNode(document.getElementById('Settings'));
            this.state.c = false;
        } else {
            ReactDOM.render(
       <AddClaim url="api/Account/AddClaim"/>,
       document.getElementById("Settings")
        );
            this.state.c = true;
        }
    },
    render: function() {
        var self = this;
        var claimsKey = "claims";
        if (typeof $.cookie(claimsKey) === "undefined") $.cookie(claimsKey, "notauth");
        if ($.cookie(claimsKey).indexOf("Admin") !== -1) {
            return (
                <div>
                <section id="profileMenuHeader" className="bg-primary">
                    <div className="container">
                        <div className="row"> 
                            <div className="col-lg-8 col-lg-offset-2 text-center">
                                <i className="fa fa-4x fa-diamond wow bounceIn text-primary text-faded" />
                                <h2 className="section-heading">Hello in Your settings!</h2>
                                <hr className="light"/>
                             </div>
                        </div>
                    </div>
                </section>

                                <section id="profileMenuInfo">
                    <div className="container">
                        <div className="row"> 
                            <div className="col-lg-3 col-lg-offset-1 col-md-6 text-center">
                                <img src={this.state.PathToTmbOfPhoto} alt="ProfileImage" />
                             </div>
                             <div className="col-lg-3 col-md-6 text-center">
                                <i className="fa fa-4x fa-diamond wow bounceIn text-primary" />
                                <p className="text-muted"><i className="fa fa-bookmark-o wow bounceIn text-primary" /> Yours First Name is - {self.state.FirstName}</p>
                                <p className="text-muted"><i className="fa fa-bookmark-o wow bounceIn text-primary" /> Yours Middle Name is - {self.state.MiddleName}</p>
                                <p className="text-muted"><i className="fa fa-bookmark-o wow bounceIn text-primary" /> Yours Last Name is - {self.state.LastName}</p>
                                <p className="text-muted"><i className="fa fa-eye wow bounceIn text-primary" /> Yours Position in company is - {self.state.PositionInCompany}</p>
                                 <p className="text-muted"><i className="fa fa-calendar-check-o wow bounceIn text-primary" /> Yours holidays starts at - {self.state.HolidayTimeStart}</p>
                            </div>
                            <div className="col-lg-3 col-md-6 text-center">
                                <i className="fa fa-4x fa-diamond wow bounceIn text-primary" />
                                <p className="text-muted"><i className="fa fa-mobile wow bounceIn text-primary" /> Yours Private phone is - {self.state.PhonePrivate}</p>
                                <p className="text-muted"><i className="fa fa-phone wow bounceIn text-primary" /> Yours Work phone is - {self.state.PhoneWork}</p>
                                <p className="text-muted"><i className="fa fa-sticky-note-o wow bounceIn text-primary" /> Yours Note is - {self.state.Notes}</p>
                                <p className="text-muted"><i className="fa fa-male wow bounceIn text-primary" /> Yours Boss is - {self.state.Boss}</p>
                                <p className="text-muted"><i className="fa fa-calendar-times-o wow bounceIn text-primary" /> Yours holidays ends at - {self.state.HolidayTimeEnd}</p>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </section>

                <aside id="profileMenuEditions" className="bg-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 text-center">
                                <i className="fa fa-4x fa-diamond wow tada text-faded" />
                                <h2 className="section-heading">Here Your can change somethig!</h2>
                                <hr className="light" />
                        <ul>
                                    <li><a onClick={self.ChangePassword} href="#ChangePassword">Change password</a></li>
                                    <li><a onClick={self.EditInfo} href="#ChangePassword">Change info</a></li>
                                    <li><a onClick={self.UploadImage} href="#UploadImage">Upload Image</a></li>
                                    <li><a onClick={self.AddClaim} href="#UploadImage">Add claim to user</a></li>
                        </ul>
                            </div>
                            </div>
                        <div className="row">
                            <div id="Settings" className="col-lg-8 col-lg-offset-4"></div>
                        </div>
                        </div>
                </aside>
</div>
            );
        } else {
            return (
    <div>
    <section id="profileMenuHeader" className="bg-primary">
        <div className="container">
            <div className="row"> 
                <div className="col-lg-8 col-lg-offset-2 text-center">
                    <i className="fa fa-4x fa-diamond wow bounceIn text-primary text-faded" />
                    <h2 className="section-heading">Hello in Your settings!</h2>
                    <hr className="light"/>
                 </div>
            </div>
        </div>
    </section>

                    <section id="profileMenuInfo">
        <div className="container">
            <div className="row"> 
                <div className="col-lg-3 col-lg-offset-1 col-md-6 text-center">
                    <img src={this.state.PathToTmbOfPhoto} alt="ProfileImage" />
                 </div>
                 <div className="col-lg-3 col-md-6 text-center">
                    <i className="fa fa-4x fa-diamond wow bounceIn text-primary" />
                    <p className="text-muted"><i className="fa fa-bookmark-o wow bounceIn text-primary" /> Yours First Name is - {self.state.FirstName}</p>
                    <p className="text-muted"><i className="fa fa-bookmark-o wow bounceIn text-primary" /> Yours Middle Name is - {self.state.MiddleName}</p>
                    <p className="text-muted"><i className="fa fa-bookmark-o wow bounceIn text-primary" /> Yours Last Name is - {self.state.LastName}</p>
                    <p className="text-muted"><i className="fa fa-eye wow bounceIn text-primary" /> Yours Position in company is - {self.state.PositionInCompany}</p>
                     <p className="text-muted"><i className="fa fa-calendar-check-o wow bounceIn text-primary" /> Yours holidays starts at - {self.state.HolidayTimeStart}</p>
                </div>
                <div className="col-lg-3 col-md-6 text-center">
                    <i className="fa fa-4x fa-diamond wow bounceIn text-primary" />
                    <p className="text-muted"><i className="fa fa-mobile wow bounceIn text-primary" /> Yours Private phone is - {self.state.PhonePrivate}</p>
                    <p className="text-muted"><i className="fa fa-phone wow bounceIn text-primary" /> Yours Work phone is - {self.state.PhoneWork}</p>
                    <p className="text-muted"><i className="fa fa-sticky-note-o wow bounceIn text-primary" /> Yours Note is - {self.state.Notes}</p>
                    <p className="text-muted"><i className="fa fa-male wow bounceIn text-primary" /> Yours Boss is - {self.state.Boss}</p>
                    <p className="text-muted"><i className="fa fa-calendar-times-o wow bounceIn text-primary" /> Yours holidays ends at - {self.state.HolidayTimeEnd}</p>
                </div>
            </div>
            <hr/>
        </div>
    </section>

    <aside id="profileMenuEditions" className="bg-dark">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2 text-center">
                    <i className="fa fa-4x fa-diamond wow tada text-faded" />
                    <h2 className="section-heading">Here Your can change somethig!</h2>
                    <hr className="light" />
            <ul>
                        <li><a onClick={self.ChangePassword} href="#ChangePassword">Change password</a></li>
                        <li><a onClick={self.EditInfo} href="#ChangePassword">Change info</a></li>
                        <li><a onClick={self.UploadImage} href="#UploadImage">Upload Image</a></li>
            </ul>
                </div>
                </div>
            <div className="row">
                <div id="Settings" className="col-lg-8 col-lg-offset-4"></div>
            </div>
            </div>
    </aside>
</div>
            );
        }
    }
});

//Solving circular dependencies http://stackoverflow.com/questions/30378226/circular-imports-with-webpack-returning-empty-object 
var EditInfo = require('./EditInfo');
var ImageUpload = require('./ImageUpload');
var AddClaim = require('./AddClaim');