import React from 'react'

export default function Spinner() {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-grow" style={{ height: "3rem", width: "3rem",marginTop: "3.5rem",marginBottom: "2rem" }} role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        )
}
