import React, { Component } from 'react'
import Newsitem from './Newsitem'

export default class Newsbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsArray: [],
            totalResults: 0,
            page: 1,
            cachedData: [],
            newsCategory: props.newsCategory
        }
    }
    nextPageHandler = async () => {
        // console.log("next");
        let fetchUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=12&apiKey=795a2ee1bb00402a87bad2cba047d329&page=${this.state.page + 1}&category=${this.state.newsCategory}`
        let fetchedData = await fetch(fetchUrl)
        let parsedData = await fetchedData.json()
        this.state.cachedData.push(parsedData.articles)
        this.setState({ newsArray: parsedData.articles, page: this.state.page + 1 })
        // console.log("page : ", this.state.page);
        // console.log("cached-data", this.state.cachedData);
    }
    previousPageHandler = async () => {
        // console.log("previous");
        await this.state.cachedData.pop()
        this.setState({ page: this.state.page - 1, newsArray: this.state.cachedData[this.state.cachedData.length - 1] })
        // console.log("page : ", this.state.page);
        // console.log("cached-data", this.state.cachedData);
    }
    async componentDidMount() {
        let fetchUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=12&apiKey=795a2ee1bb00402a87bad2cba047d329&page=${this.state.page}&category=${this.state.newsCategory}`
        let fetchedData = await fetch(fetchUrl)
        let parsedData = await fetchedData.json()
        this.state.cachedData.push(parsedData.articles)
        this.setState({ newsArray: parsedData.articles, totalResults: parsedData.totalResults })
    }
    render() {
        let { boxTitle } = this.props;
        return (
            <div>
                <h2 className="text-center">{boxTitle}</h2>
                <div className="row mx-5">
                    {this.state.newsArray.map((news) => {
                        return <div key={news.url} className="col-md-3">
                            <Newsitem newsTitle={news.title} newsSource={news.source.name} newsUrl={news.url} imageUrl={news.urlToImage !== null ? news.urlToImage :`https://source.unsplash.com/286x158/?${news.title.split(" ")[0]}`} newsDate={news.publishedAt} />
                        </div>
                    })}
                </div>
                <hr />
                <div className="text-center">
                    <button className="btn btn-dark mx-5 my-2" disabled={this.state.page <= 1} onClick={this.previousPageHandler} type="button">&larr;Previous</button>
                    <button className="btn btn-dark mx-5 my-2" disabled={this.state.page >= Math.ceil(this.state.totalResults / 12) - 1} onClick={this.nextPageHandler} type="button">Next&rarr;</button>
                </div>
            </div>
        )
    }
}
