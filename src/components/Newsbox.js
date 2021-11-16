import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Newsitem from './Newsitem'
import Spinner from './Spinner';

export default function Newsbox(props) {
    const [newsArray, setNewsArray] = useState([])
    const [page, setPage] = useState(1)
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [cachedData, setCachedData] = useState([])
    const [totalResults, setTotalResults] = useState(0)

    const updateNewsArray = async (currentPage) => {
        props.setProgress(15)
        setLoadingStatus(true)
        let fetchUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=12&apiKey=${props.apiKey}&page=${currentPage}&category=${props.newsCategory}`
        props.setProgress(35)
        let fetchedData = await fetch(fetchUrl)
        let parsedData = await fetchedData.json()
        {
        let tempCachedData = cachedData
        tempCachedData.push(parsedData.articles)
        setCachedData(tempCachedData)
        }
        props.setProgress(65)
        props.setProgress(75)
        setNewsArray(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoadingStatus(false)
        props.setProgress(100)
    }
    const nextPageHandler = async () => {
        updateNewsArray(page + 1)
        setPage(page + 1)
    }
    const previousPageHandler = () => {
        document.documentElement.scrollTop = 0;
        cachedData.pop()
        setPage(page - 1)
        setNewsArray(cachedData[cachedData.length - 1])
    }
    useEffect(() => {
        document.title = (props.newsCategory !== "General") ? `Monk-eNews - ${props.newsCategory}` : "Monk-eNews"
        updateNewsArray(page)
        //eslint-disable-next-line
    }, [])
    return (
        <div>
            <h1 className="text-center" style={{fontSize:"2rem",marginTop:"4rem",marginBottom:"0.5rem"}}>{props.boxTitle}</h1>
            {loadingStatus && <Spinner />}
            <div className="row mx-5">
                {(!loadingStatus) && newsArray.map((news) => {
                    return <div key={news.url} className="col-md-3">
                        <Newsitem newsTitle={news.title} newsSource={news.source.name} newsUrl={news.url} imageUrl={news.urlToImage !== null ? news.urlToImage : `https://source.unsplash.com/286x158/?${news.title.split(" ")[0]}`} newsDate={news.publishedAt} />
                    </div>
                })}
            </div>

            {(!loadingStatus) && <div className="text-center my-5">
                <hr />
                <button className="btn btn-dark mx-5 my-2" disabled={page <= 1} onClick={previousPageHandler} type="button">&larr;Previous</button>
                <button className="btn btn-dark mx-5 my-2" disabled={page >= Math.ceil(totalResults / 12) - 1} onClick={nextPageHandler} type="button">Next&rarr;</button>
            </div>}
        </div>
    )
}
Newsbox.defaultProps = {
    newsCategory: "General",
    boxTitle: "Top Headlines"
 };
Newsbox.propTypes = {
    newsCategory: PropTypes.string,
    apiKey: PropTypes.string,
    boxTitle: PropTypes.string
  };
