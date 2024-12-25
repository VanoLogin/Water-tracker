import Header from '../Header/Header'
import css from './SharedLayout.module.css'

export default function SharedLayout({ children }) {
    
    return (
        <div className={css.container}>
            <Header />
            {children}
        </div>
    )
}