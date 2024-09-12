import { Link } from 'react-router-dom'
import styles from './sectionTitle.module.css'

export default function SectionTitle(){
    return(
        <div className={styles.sectionTitle}>
            <div className={styles.boxTitle}>
                <div className={styles.boxColor}></div>
                <p>Equipes</p>
            </div>
            <Link className={styles.seeAll} to='/race'>Ver todos</Link>
        </div>
    )
}