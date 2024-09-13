import { useState } from 'react'
import styles from './profile.module.css'
import imgProfile from '../../assets/user_profile.png'

export default function Profile() {
    const [isEdit, setIsEdit] = useState(false)

    const handleEdit = () => {
        setIsEdit(!isEdit)
    }

    const handleSave = () => {
        setIsEdit(isEdit)
    }

    return (
        <section className={styles.profile}>
            <h1>Perfil</h1>
            <form className={styles.boxMain}>
                <div className={styles.rowProfile}>
                    <div className={styles.dataProfile}>
                        <img src={imgProfile} alt="" />
                    </div>
                    {isEdit ?
                        <button className={styles.btnProfile} style={{backgroundColor: '#0054FF '}} type='button' onClick={handleSave}>Salvar</button>
                        :
                        <button className={styles.btnProfile} type='button' onClick={handleEdit}>Editar</button>
                    }
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <label htmlFor="fullName" className="form-label">Nome completo</label>
                        <input type="text" disabled={!isEdit} required name="fullName" id="fullName" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-4">
                        <label htmlFor="username" className="form-label">Usuário</label>
                        <input type="text" disabled={!isEdit} required name="username" id="username" className="form-control" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" disabled required name="email" id="email" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-4">
                        <label htmlFor="" className="form-label">Data de nascimento</label>
                        <input type="date" disabled={!isEdit} required name="" id="" className="form-control" />
                    </div>
                </div>
                {/* <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="" className="form-label">Senha</label>
                        <input type="text" name="" id="" className="form-control" />
                    </div>
                </div> */}
            </form>
        </section>
    )
}