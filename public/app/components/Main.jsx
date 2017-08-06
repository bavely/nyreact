var React = require("react");
var Search = require("./Search.jsx");
var Helper = require("../utils/helper.js");
var Saved = require("./Saved.jsx");
var Link = require("react-router").Link;

var Main = React.createClass({

        getInitialState: function () {
        return { data: [] }
        this.setState({ data:[] });
    },


        gettingData: function () {
            this.setState({ data: [] });
            Helper.getHistory().then(function (data) {
                this.setState({ data: data.data });
                console.log(data);
            }.bind(this));
        },

     render: function () {
   const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       history: this.state.data
     })
    );
    console.log(this.state.data);
  
        return (
               
            <div className="container">
                    <div className=" row page-header "> 
                        <h4>New York Times Article Search</h4>
                        
                        <Link to="/Saved"><a onClick={this.gettingData}  className="routBtn"> Saved News </a></Link >
                    <Link to="/Search"><a  className="routBtn" > Search </a></Link >
                    </div>
                    {childrenWithProps}
                     
                </div>
                
        );
     }
});

module.exports = Main;