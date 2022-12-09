import React from 'react';

const CenterTemplate = (pieChart) => {
    const formatNumber = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0
    }).format;

    function calculateTotal(pieChart) {
        return formatNumber(
            pieChart
                .getAllSeries()[0]
                .getVisiblePoints()
                .reduce((s, p) => s + p.originalValue, 0)
        );
    }

    return (
        <svg>
            <circle
                cx="100"
                cy="100"
                r={pieChart.getInnerRadius() - 6}
                fill="#494545"
            ></circle>
            <text
                textAnchor="middle"
                x="100"
                y="100"
                style={{ fontSize: 18, fill: "bisque" }}
            >
                <tspan x="100">{'Всего'}</tspan>
                <tspan x="100" dy="20px" style={{ fontWeight: 400 }}>
                    {calculateTotal(pieChart) + ' Руб.'}
                </tspan>
            </text>
        </svg>
    );
};

export default CenterTemplate;
