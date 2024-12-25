import css from './WaterRatioPanel.module.css'
import ProgressBar from './ProgressBar/ProgresBar'

export default function WaterRatioPanel() {
    return (
        <div className={css.container}>
            <p className={css.progresstext}>Today</p>
            <ProgressBar/>
        </div>
    )
}