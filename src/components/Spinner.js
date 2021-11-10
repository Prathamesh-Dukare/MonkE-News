import React, { Component } from 'react'

export default class Spinner extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-grow" style={{ height: "3rem", width: "3rem",marginTop: "10rem" }} role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        )
    }
}
