import styles from "./UploadPhotoUser.module.css";
import profile from "../../assets/profile.svg";

function UploadPhotoUser({ value, onChange }) {
  function mudarFoto(e) {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
    } else {
      onChange(null);
    }
  }

  return (
    <div className={styles.uploadContainer}>
      <label className={styles.picture} htmlFor="picture__input" tabIndex="0">
        <span className={styles.picture__image}>
          <img
            src={value ? URL.createObjectURL(value) : profile}
            alt="icone de adicionar foto"
            className={styles.addPhotoIcon}
          />
        </span>
      </label>
      <input
        type="file"
        onChange={mudarFoto}
        id="picture__input"
        className={styles.pictureInput}
      />
    </div>
  );
}

export default UploadPhotoUser;
