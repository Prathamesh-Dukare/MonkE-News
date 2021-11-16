import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
export default class Newsbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsArray: [],
            totalResults: 0,
            page: 1,
            cachedData: [],
            newsCategory: props.newsCategory,
            loadingStatus: false
        }
        document.title = (this.props.newsCategory!=="General") ? `Monk-eNews - ${this.props.newsCategory}` : "Monk-eNews"
    }
    updateNewsArray = async (currentPage) => {
        this.props.setProgress(15)
        this.setState({ loadingStatus: true })
        let fetchUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=12&apiKey=${this.props.apiKey}&page=${currentPage}&category=${this.state.newsCategory}`
        this.props.setProgress(35)
        let fetchedData = await fetch(fetchUrl)
        let parsedData = await fetchedData.json()
        this.props.setProgress(65)
        this.state.cachedData.push(parsedData.articles)
        this.props.setProgress(75)
        this.setState({ newsArray: parsedData.articles, totalResults: parsedData.totalResults, loadingStatus: false })
        this.props.setProgress(100)
    }
    nextPageHandler = async () => {
       this.updateNewsArray(this.state.page+1)
       this.setState({page: this.state.page+1})
    }
    previousPageHandler = async () => {
        document.documentElement.scrollTop = 0;
        await this.state.cachedData.pop()
        this.setState({ page: this.state.page - 1, newsArray: this.state.cachedData[this.state.cachedData.length - 1] })
    }
    async componentDidMount() {
        this.updateNewsArray(this.state.page)
    }
    render() {
        let { boxTitle } = this.props;
        return (
            <div>
                <h2 className="text-center my-2">{boxTitle}</h2>
                {this.state.loadingStatus && <Spinner />}
                <div className="row mx-5">
                    {(!this.state.loadingStatus) && this.state.newsArray.map((news) => {
                        return <div key={news.url} className="col-md-3">
                            <Newsitem newsTitle={news.title} newsSource={news.source.name} newsUrl={news.url} imageUrl={news.urlToImage !== null ? news.urlToImage : `https://source.unsplash.com/286x158/?${news.title.split(" ")[0]}`} newsDate={news.publishedAt} />
                        </div>
                    })}
                </div>

                {(!this.state.loadingStatus) && <div className="text-center my-5">
                    <hr />
                    <button className="btn btn-dark mx-5 my-2" disabled={this.state.page <= 1} onClick={this.previousPageHandler} type="button">&larr;Previous</button>
                    <button className="btn btn-dark mx-5 my-2" disabled={this.state.page >= Math.ceil(this.state.totalResults / 12) - 1} onClick={this.nextPageHandler} type="button">Next&rarr;</button>
                </div>}
            </div>
        )
    }
}
