import { useEffect, useState } from 'react';
import styles from './profile.module.css';
import ContainerProduct from '../../components/ContainerProduct';
import PageTitle from '../../components/PageTitle';
import useContexts from '../../hooks/useContext';
import axios from 'axios';
import { baseUrl } from '../../service/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const { setDataUser, dataUser, setIsLoading } = useContexts();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [birthdate, setBirthdate] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const userStorage = JSON.parse(localStorage.getItem('userStorage'));

    axios
      .get(`${baseUrl}/user/${userStorage.id}`)
      .then((response) => {
        console.log(response);
        setDataUser(response.data);
        setName(response.data.fullname);
        setEmail(response.data.email);
        setNickname(response.data.nickname);
        setProfilePicture(response.data.profile_picture);
        setBirthdate(response.data.birthdate.split('T')[0]); // Formata a data
      })
      .catch((error) => {
        console.log(error);
        toast.error('Usuário não encontrado, realize o login novamente!');
        navigate('/login');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate, setIsLoading, setDataUser]);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = async () => {
    setIsLoading(true);
    const userStorage = JSON.parse(localStorage.getItem('userStorage'));

    const updatedData = {
      fullname: name,
      nickname: nickname,
      birthdate: birthdate, // Certifique-se de que a data esteja no formato YYYY-MM-DD
    };

    try {
      const response = await axios.put(
        `${baseUrl}/user/${userStorage.id}`,
        updatedData
      );
      console.log(response.data);
      setDataUser(response.data.updatedUser);
      toast.success('Perfil atualizado com sucesso!');
      setIsEdit(false); // Sair do modo de edição
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar o perfil. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.profile}>
      <PageTitle text={'Perfil'} />
      <form className={styles.boxMain}>
        <div className={`${styles.rowProfile} mb-5`}>
          <div className={`${styles.dataProfile}`}>
            <img
              src={profilePicture}
              className={styles.imgProfile}
              alt='Imagem de perfil'
            />
            <div className={styles.userProfile}>
              <p>{name}</p>
              <span>Pontos Totais: {dataUser.all_points} pontos</span>
              <span>Pontos Atuais: {dataUser.current_points} pontos</span>
            </div>
          </div>

          {isEdit ? (
            <div className={styles.btns}>
              <button
                className={`${styles.btnPassword}`}
                type='button'
                onClick={handleEdit}
              >
                Alterar senha
              </button>
              <button
                className={styles.btnProfile}
                style={{ backgroundColor: '#0054FF ' }}
                type='button'
                onClick={handleSave}
              >
                Salvar
              </button>
            </div>
          ) : (
            <div className={styles.btns}>
              <button
                className={`${styles.btnPassword}`}
                type='button'
                onClick={handleEdit}
              >
                Alterar senha
              </button>
              <button
                className={styles.btnProfile}
                type='button'
                onClick={handleEdit}
              >
                Editar
              </button>
            </div>
          )}
        </div>
        <div className='row'>
          <div className='col-md-6 mb-4'>
            <label htmlFor='fullName' className='form-label'>
              Nome completo
            </label>
            <input
              type='text'
              disabled={!isEdit}
              required
              name='fullName'
              id='fullName'
              className='form-control'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='col-md-6 mb-4'>
            <label htmlFor='username' className='form-label'>
              Usuário
            </label>
            <input
              type='text'
              disabled={!isEdit}
              required
              name='username'
              id='username'
              className='form-control'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 mb-4'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              disabled
              required
              name='email'
              id='email'
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='col-md-6 mb-4'>
            <label htmlFor='birthdate' className='form-label'>
              Data de nascimento
            </label>
            <input
              type='date'
              disabled={!isEdit}
              required
              name='birthdate'
              id='birthdate'
              className='form-control'
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div className={styles.boxProduct}>
        <h2 className={styles.title}>Produtos resgatados</h2>
        <ContainerProduct listItens={['teste']} />
      </div>
    </section>
  );
}
