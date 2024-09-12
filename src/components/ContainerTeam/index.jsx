import TeamCard from '../TeamCard'
import styles from './containerTeam.module.css'

export default function ContainerTeam(){
    return(
        <div className={styles.containerTeam}>
            <TeamCard />
            <TeamCard />
            <TeamCard />
        </div>
    )
}