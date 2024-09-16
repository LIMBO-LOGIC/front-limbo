import styles from './raceCard.module.css'
import circuit from '../../assets/racing_circuit_retrait.png'
import flagBr from '../../assets/bandeira_brasil.png'

export default function RaceCard(){
    return(
        <div className={styles.raceCard}>
            <div className={styles.raceBox}>
                <p className={styles.titleBox}> 7 de Dezembro</p>
                <div className={styles.dataRace}>
                    <div className={styles.textBox}>
                        <p>São Paulo</p>
                        <img src={flagBr} alt="Bandeira do país do circuito" />
                    </div>
                    <div className={styles.line}></div>
                    <p>Round 1</p>
                </div>
            </div>
            <img className={styles.circuit} src={circuit} alt='circuito de corrida' />
        </div>
    )
}