import css from './DaysGeneralStats.module.css'

export default function DaysGeneralStats({day, onClose}) {
    return (
        <div className={css.container}>
            <h3 className={css.date}>{ day.date}</h3>
            <h3 className={css.title}>Daily norma: <span className={css.span}>{ day.dailyNorm}</span></h3>
            <h3 className={css.title}>Fulfillment of the daily norm: <span className={css.span}>{day.waterPercent}</span> </h3>
            <h3 className={css.title}>How many servings of water: <span className={css.span}>{day.consumptionCount}</span></h3>
        </div>
    )
}