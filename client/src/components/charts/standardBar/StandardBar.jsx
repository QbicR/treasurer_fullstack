import React from 'react';
import { Chart, Series, Legend, Tooltip, Animation, ValueAxis, Label, CommonAxisSettings, Aggregation, Grid, ArgumentAxis, Font } from "devextreme-react/chart";
import classes from './standartBar.module.scss'
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types'

const StandardBar = observer(({ arr, color }) => {

    const newArr = Object.entries(
        arr.reduce((acc, { category, val }) => ({ ...acc, [category]: (acc[category] ?? 0) + val }), {})
    ).map(([category, val]) => ({ category, val })).sort((x, y) => y.val - x.val)

    return (
        <Chart id={classes.chart} dataSource={newArr}>
            <Animation
                easing="easeOutCubic"
                duration={500}
                maxPointCountSupported={100}
                enabled={true}
            />
            <Series
                valueField="val"
                argumentField="category"
                type="bar"
                color={color}
            >
            </Series>
            <CommonAxisSettings color='#cfba9d'>
                <Grid visible={true} color='#cfba9d'></Grid>
                <Label>
                    <Font color='#cfba9d' />
                </Label>
            </CommonAxisSettings>
            {/* <ValueAxis color='#cfba9d'>
                <Grid visible={true} color='#cfba9d'></Grid>
                <Label>
                    <Font color='#cfba9d' />
                </Label>
            </ValueAxis>
            <ArgumentAxis color='#cfba9d'>
                <Label>
                    <Font color='#cfba9d' />
                </Label>
                <Grid visible={true} color='#cfba9d'></Grid>
            </ArgumentAxis> */}
            <Legend visible={false}></Legend>
            <Tooltip enabled={true} location="edge" />
        </Chart>
    );
});

StandardBar.propTypes = {
    arr: PropTypes.array,
    color: PropTypes.string
}

export default StandardBar;
