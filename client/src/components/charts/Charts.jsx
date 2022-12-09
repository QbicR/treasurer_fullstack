import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import PieChart from './pieChart/PieChart';
import StandardBar from './standardBar/StandardBar';
import { greenColors, redColors } from '../../utils/chartColors';
import PropTypes from 'prop-types'
import classes from './Charts.module.css'

const Charts = observer(({ operations }) => {
    const [button, setButton] = useState(true)
    const [active, setActive] = useState('Доходы')
    const replenishmentOperations = operations?.filter(operation => operation.type === 'replenishment')
    const writeOffOperations = operations?.filter(operation => operation.type === 'writeОff')

    const replenishmentOperationsArray = replenishmentOperations?.map(operation => {
        return { category: operation.category, val: operation.value }
    })

    const writeOffOperationsArray = writeOffOperations?.map(operation => {
        return { category: operation.category, val: operation.value }
    })

    const handleClickFirstBtn = (event) => {
        setButton(true)
        setActive(event.target.innerText)
    }

    const handleClickSecondBtn = (event) => {
        setButton(false)
        setActive(event.target.innerText)
    }

    return (
        <div className={classes.charts_card}>
            <div className={classes.chart_btns}>
                <button
                    className={active === 'Доходы' ? classes.chart_btn_active : classes.chart_btn}
                    onClick={handleClickFirstBtn}
                >
                    Доходы
                </button>
                <button
                    className={active === 'Расходы' ? classes.chart_btn_active : classes.chart_btn}
                    onClick={handleClickSecondBtn}
                >
                    Расходы
                </button>
            </div>
            {button ?
                <div className={classes.charts}>
                    {replenishmentOperationsArray?.length > 0 ?
                        <>
                            <PieChart
                                arr={replenishmentOperationsArray}
                                colors={greenColors}
                            />
                            <StandardBar
                                arr={replenishmentOperationsArray}
                                color={greenColors[0]}
                            />
                        </>
                        :
                        <h3>Доходов нет</h3>
                    }
                </div>
                :
                <div className={classes.charts}>
                    {writeOffOperationsArray?.length > 0 ?
                        <>
                            <PieChart
                                arr={writeOffOperationsArray}
                                colors={redColors}
                            />
                            <StandardBar
                                arr={writeOffOperationsArray}
                                color={redColors[0]}
                            />
                        </>
                        :
                        <h3>Расходов нет</h3>
                    }
                </div>
            }
        </div>
    );
});

Charts.propTypes = {
    operations: PropTypes.array
}

export default Charts;


// const arr = [
//     { category: "Еда", value: 500 },
//     { category: "Машина", value: 500 },
//     { category: "Еда", value: 300 },
//     { category: "Кафе", value: 1500 },
//     { category: "Еда", value: 500 },
//     { category: "Машина", value: 10500 },
// ]
// const arr2 = [
//     { category: "Еда", value: 1300 },
//     { category: "Машина", value: 11000 },
//     { category: "Кафе", value: 1500 }
// ]

// const arr2 = Object.entries(
//     arr.reduce((acc, { category, value }) => ({ ...acc, [category]: (acc[category] ?? 0) + value }), {})
// ).map(([category, value]) => ({ category, value }))


// console.log(arr2);