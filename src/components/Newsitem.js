import React, { Component } from 'react'

export default class Newsitem extends Component {
    render() {
        let { newsTitle, newsSource, newsUrl, imageUrl, newsDate } = this.props;
        let newsTitleSorted = newsTitle.split(" - ")[0].slice(0, 90).split(" ")
        newsTitleSorted.pop()
        return (
            <div className="card" style={{ width: "18rem" }}>
                <img src={imageUrl} style={{ width: "286px", height: "158px" }} className="card-img-top" alt={`${newsTitle.split(" - ")[0]}`} />
                <div className="card-body">
                    <h5 className="card-title">{newsTitle.split(" - ")[0].length > 90 ? newsTitleSorted.join(" ") : newsTitle.split(" - ")[0]}</h5>
                    <p className="card-text">Source : {newsSource}</p>
                    <p className="card-text">Date : {new Date(newsDate).toDateString()}</p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">Read More</a>
                </div>
            </div>
        )
    }
}
