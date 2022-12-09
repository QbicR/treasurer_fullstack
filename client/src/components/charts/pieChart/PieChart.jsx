import React from 'react';
import { observer } from 'mobx-react-lite';
import PieChart, { Legend, Series, Tooltip, Label, Animation, Font } from 'devextreme-react/pie-chart'
import classes from './pieChart.module.css'
import CenterTemplate from './CenterTemplate';
import PropTypes from 'prop-types'

const pieChart = observer(({ arr, colors }) => {

    const newArr = Object
        .entries(arr.reduce((acc, { category, val }) => ({ ...acc, [category]: (acc[category] ?? 0) + val }), {}))
        .map(([category, val]) => ({ category, val }))

    newArr.sort((x, y) => y.val - x.val)

    const customizeTooltip = (data) => {
        return `<div>${data.argumentText}</br>${data.valueText}</div>`;
    };

    const customizeLabel = (data) => {
        return data.percentText;
    }

    return (
        <PieChart
            id={classes.pie}
            type="doughnut"
            innerRadius={0.6}
            palette={colors}
            dataSource={newArr}
            centerRender={CenterTemplate}
        >
            <Animation
                easing="easeOutCubic"
                duration={500}
                maxPointCountSupported={100}
                enabled={true}
            />
            <Series argumentField="category" >
                <Label
                    visible={true}
                    type="percent"
                    position="inside"
                    backgroundColor="transparent"
                    customizeText={customizeLabel}
                >
                    <Font color={'bisque'} />
                </Label>
            </Series>
            <Legend
                rowItemSpacing={10}
                verticalAlignment="top"
                horizontalAlignment="right"
            >
                <Font color={'#cfba9d'} />
            </Legend>
            <Tooltip
                enabled={true}
                contentTemplate={customizeTooltip}
            >
                <Font color={'black'} />
            </Tooltip>
        </PieChart>
    );
});

pieChart.propTypes = {
    arr: PropTypes.array,
    colors: PropTypes.array
}

export default pieChart;