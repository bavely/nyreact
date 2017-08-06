var React = require("react");
var ReactDom = require("react-dom");
var Helper = require("../utils/helper.js")

var Results = React.createClass({

    handelSave : function(head,img,paragraph,url,date,newsDesk,event){
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
        Helper.postHistory(data)
    },

    render: function () {
        console.log(this.props.news);
        return (
                <div className="col-md-12 ">
                    <div className="panel ">
                        <div className="panel-heading"><h3 className="panel-title">Results</h3></div>
                        <div className="panel-body">
                        {this.props.news.map(function (news, i) {
                            return (
                                <div className="well well-lg" key={i}>
                                    <form onSubmit={this.handelSave.bind(this, news.head,news.img,news.paragraph,news.url,news.date,news.newsDesk)}>
                                    <ul key={i}>
                                        <li><h3  id="headNews" value={news.head}>{news.head}</h3></li>
                                        <li><img  src={news.img} id = "newsImg" value={news.img} className="img-thumbnail" /></li>
                                        <li><p  id="newsParagraph" value={news.paragraph}>{news.paragraph}</p></li>
                                        <li><a  id="newsUrl" value={news.url} href={news.url} target="_blank">Read More</a></li>
                                        <li><h5  id="newsDate" value={news.date}>{news.date}</h5></li>
                                        <li><h5  id="newsDesk" value={news.newsDesk}>{news.newsDesk}</h5></li>
                                        <li><button  type="submit" className="btn btn-success" >Save</button></li>
                                    </ul>
                                    </form>
                                </div>
                            );
                        }.bind(this))}
                        </div>
                    </div>
                </div>
        )
    }
});

module.exports = Results;