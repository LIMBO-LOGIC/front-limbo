/* eslint-disable react/prop-types */
import styles from './adminTitle.module.css'

export default function AdminTitle({text, icon}) {
  return (
    <div className="mb-3">
      <div className="card">
        <div className={`d-flex align-items-center gap-3 card-body ${styles.title}`}>
          {icon}
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}
