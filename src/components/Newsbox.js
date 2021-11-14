import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
export default class Newsbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsArray: [],
            totalResults: 0,
            page: 1,
            newsCategory: props.newsCategory,
            loadingStatus : false
        }
    }
    async componentDidMount() {
        this.setState({loadingStatus : true})
        let fetchUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=12&apiKey=022611639ad44b908d27115bc632634b&page=${this.state.page}&category=${this.state.newsCategory}`
        let fetchedData = await fetch(fetchUrl)
        let parsedData = await fetchedData.json()
        this.setState({ newsArray: parsedData.articles, totalResults: parsedData.totalResults,loadingStatus : false })
    }
    fetchMoreData = async () => {
        let fetchUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=12&apiKey=022611639ad44b908d27115bc632634b&page=${this.state.page + 1}&category=${this.state.newsCategory}`
        let fetchedData = await fetch(fetchUrl)
        let parsedData = await fetchedData.json()
        this.setState({ newsArray: this.state.newsArray.concat(parsedData.articles), page: this.state.page + 1 })
    }
    topScroll = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    render() {

        return (
            <div>
                <h2 className="text-center my-2">{this.state.newsCategory==="General"?"Top Headlines":this.state.newsCategory+" News"} of the Day</h2>
                {this.state.loadingStatus && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.newsArray.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.totalResults !== this.state.newsArray.length}
                    loader={<Spinner />}
                >
                    <div className="row mx-5">
                        {this.state.newsArray.map((news) => {
                            return <div key={news.url} className="col-md-3">
                                <Newsitem newsTitle={news.title} newsSource={news.source.name} newsUrl={news.url} imageUrl={news.urlToImage !== null ? news.urlToImage : `https://source.unsplash.com/286x158/?${news.title.split(" ")[0]}`} newsDate={news.publishedAt} />
                            </div>
                        })}
                    </div>
                </InfiniteScroll>
               {this.state.page>1 && <button id="top-scroll-btn" title="go to top" onClick={this.topScroll}>⏏Top</button>}
            </div>
        )
    }
}
