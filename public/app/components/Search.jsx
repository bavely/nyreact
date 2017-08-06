var React = require("react");
var ReactDom = require("react-dom");
var Results = require("./Results.jsx")
var Link = require("react-router").Link;
var Search = React.createClass({
        getInitialState: function() {
        return {text: "", startyear: "", endyear:"", resArr:[]};
    },
    ajaxCall: function () {
        console.log(this.state.text+this.state.startyear+this.state.endyear)
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
            'api-key': "8b66773d884e4a0a9b8e7e89d5f61b72",
            'q': this.state.text,
            'begin_date': this.state.startyear,
            'end_date': this.state.endyear
        });
       return $.ajax({
            url: url,
            method: 'GET',
        })
    },

    handleSubmit: function (event) {
        event.preventDefault();
        var getAjax = this.ajaxCall();
         var  resArr = [];
        getAjax.done(function(data){
            console.log(data);

            for (var i=0; i<data.response.docs.length; i++){
               var res={
                head: data.response.docs[i].headline.main,
                paragraph: data.response.docs[i].snippet,
                date: data.response.docs[i].pub_date,
                newsDesk: data.response.docs[i].news_desk,
                url: data.response.docs[i].web_url
               };
            if(data.response.docs[i].multimedia.length === 0){res.img = "http://tangopaparazzo.com/wp-content/themes/bohaute/images/blank.jpg"}
            else {res.img="http://www.nytimes.com/" + data.response.docs[i].multimedia[1].url}
               resArr.push(res);
               console.log (resArr);
               console.log(res)
            }
            console.log (resArr);
            this.setState({resArr})
        }.bind(this));

    },


handleChange: function(event){
    var state={};
    state[event.target.name]= $.trim( event.target.value);
    this.setState(state);
},






    render: function () {
       console.log(this.state.resArr)
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="panel ">
                        <div className="panel-heading"><h3 className="panel-title">Search</h3></div>
                        <div className="panel-body">
                            <form ref='user_form'  onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="text">Topic:</label>
                                    <input type="text" name="text"  className="form-control"  onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="startyear">Start Date:</label>
                                    <input type="text" className="form-control"  name="startyear"   placeholder="YYYYMMDD" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="endyear">End Date: </label>
                                    <input type="text" className="form-control"   name="endyear" placeholder="YYYYMMDD" onChange={this.handleChange} />
                                </div>
                                 <button type="submit"   className="btn btn-info" >Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <Results news={this.state.resArr}/>
            </div>
        );
    }
});

module.exports = Search;