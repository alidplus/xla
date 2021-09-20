import styles from './Avatar.module.css'

export function SmallAvatar(params) {
    return (
        <div className={`ratio ratio-1x1 ${styles.smallAvatar}`}>
            <img src="./AMP_0081.JPG" className="rounded-circle d-block"/>
        </div>
    )
}

export function LargeAvatar(params) {
    return (
        <div className={`ratio ratio-1x1 ${styles.largeAvatar}`}>
            <img src="./AMP_0081.JPG" className="rounded-circle d-block"/>
        </div>
    )

}


export function SquareAvatar(params) {
    return (
        <div className={`ratio ratio-1x1 ${styles.squareAvatar}`}>
            <img src="./AMP_0081.JPG" className="d-block"/>
        </div>
    )

}

