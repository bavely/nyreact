var React = require("react");
var ReactDom = require("react-dom");
var Helper = require("../utils/helper.js");

var Saved = React.createClass({
    getInitialState: function () {
        return { data: [] }
        this.setState({ data:[] });
    },



    handelDelete: function (head, img, paragraph, url, date, newsDesk, event) {
        event.preventDefault();
        var data = {
            head,
            img,
            paragraph,
            url,
            date,
            newsDesk
        }
        console.log(data);
        Helper.deleteHistory(data);
       
    },

    render: function () {
        console.log(this.props.history);
        return (
            <div className="row">
            <div className="col-md-12 ">
                <div className="panel ">
                    <div className="panel-heading"><h3 className="panel-title">Saved News</h3></div>
                    
                    <div className="panel-body">
                        {this.props.history.map(function (news, i) {
                            return (
                                <div className="well well-lg" key={i}>
                                    <form onSubmit={this.handelDelete.bind(this, news.head, news.img, news.paragraph, news.url, news.date, news.newsDesk)}>
                                        <ul key={i}>
                                            <li><h3 id="headNews" value={news.head}>{news.head}</h3></li>
                                            <li><img src={news.img} id="newsImg" value={news.img} className="img-thumbnail" /></li>
                                            <li><p id="newsParagraph" value={news.paragraph}>{news.paragraph}</p></li>
                                            <li><a id="newsUrl" value={news.url} href={news.url} target="_blank">Read More</a></li>
                                            <li><h5 id="newsDate" value={news.date}>{news.date}</h5></li>
                                            <li><h5 id="newsDesk" value={news.newsDesk}>{news.newsDesk}</h5></li>
                                            <li><button type="submit" className="btn btn-danger" >Delete</button></li>
                                        </ul>
                                    </form>
                                </div>
                            );
                        }.bind(this))}
                        </div>
                </div>
            </div>
            </div>
        )
    }
});

module.exports = Saved;