import { MdSupervisedUserCircle } from 'react-icons/md'
import styles from './cardAdmin.module.css'

// eslint-disable-next-line react/prop-types
export default function CardAdmin({nomeCard, valorCard}){
    return(
        <div className={`${styles.cardDash} card  mb-3`}>
          <div className={`${styles.titleDash}`}>
            <span>
              {" "}
              <MdSupervisedUserCircle size={32} />
            </span>
            <p className={`${styles.titleText}`}>{nomeCard}</p>
          </div>
          <div className={`${styles.data}`}>
            <p id="numeroVendasSemanal">{valorCard}</p>

            <div className={styles.range}>
              <div className={styles.fill}></div>
            </div>
          </div>
        </div>
    )
}