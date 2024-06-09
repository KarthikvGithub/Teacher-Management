import React from 'react';

function AvgButton({ fetchAverageClasses, averageClasses }) {
    return (
        <div className="average-button-container">
            {averageClasses === null && (
                <button className="average-button" onClick={fetchAverageClasses}> Average </button>
            )}
            {averageClasses !== null && (
                <button className="average-button" onClick={fetchAverageClasses}> {averageClasses} </button>
            )}
        </div>
    );
}

export default AvgButton;