import React, { useState, useEffect } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'

export default function Newsbox(props) {
    const [newsArray, setNewsArray] = useState([]);
    const [page, setPage] = useState(1);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [totalResults, settotalResults] = useState(0);

    const updateNews = async () => {
        props.setProgress(10)
        setLoadingStatus(true)
        let fetchUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=12&apiKey=${props.apiKey}&page=${page}&category=${props.newsCategory}`
        props.setProgress(35)
        let fetchedData = await fetch(fetchUrl)
        let parsedData = await fetchedData.json()
        props.setProgress(60)
        setNewsArray(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setLoadingStatus(false)
        props.setProgress(100)
    }
    useEffect(() => {
        document.title = (props.newsCategory !== "General") ? `Monk-eNews - ${props.newsCategory}` : "Monk-eNews"
        updateNews()
        //eslint-disable-next-line
    }, [])
    const fetchMoreData = async () => {
        let fetchUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=12&apiKey=${props.apiKey}&page=${page + 1}&category=${props.newsCategory}`
        setPage(page + 1)
        let fetchedData = await fetch(fetchUrl)
        let parsedData = await fetchedData.json()
        setNewsArray(newsArray.concat(parsedData.articles))
    }
    const topScroll = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    return (
        <div>
            <h1 className="text-center" style={{ fontSize: "2rem", marginTop: "4rem" }}>{props.newsCategory === "General" ? "Top Headlines" : props.newsCategory + " News"} of the Day</h1>
            {loadingStatus && <Spinner />}
            <InfiniteScroll
                dataLength={newsArray.length}
                next={fetchMoreData}
                hasMore={totalResults !== newsArray.length}
                loader={<Spinner />}
            >
                <div className="row mx-5">
                    {newsArray.map((news) => {
                        return <div key={news.url} className="col-md-3">
                            <Newsitem newsTitle={news.title} newsSource={news.source.name} newsUrl={news.url} imageUrl={news.urlToImage !== null ? news.urlToImage : `https://source.unsplash.com/286x158/?${news.title.split(" ")[0]}`} newsDate={news.publishedAt} />
                        </div>
                    })}
                </div>
            </InfiniteScroll>
            {page > 1 && <button id="top-scroll-btn" className="my-3" title="go to top" onClick={topScroll}>⏏Top</button>}
        </div>
    )
}
Newsbox.defaultProps = {
    newsCategory: "General"
}
Newsbox.propTypes = {
    newsCategory: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired//May cause issues
}