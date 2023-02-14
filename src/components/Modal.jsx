import { useGlobalContext } from "../contex"

const Modal = () => {
    const {selected, closeModal} = useGlobalContext()

    const {strMeal:title, strMealThumb:image, strInstructions:text, strSource:source} = selected

    return (
        <aside className="modal-overlay">
            <div className="modal-container">
                <img src={image} alt={title} className="img modal-img"/>
                <div className="modal-content">
                <h4>{title}</h4>
                <p>Instructions</p>
                <p>{text}</p>
                <a href={source} target="_blank">Source</a>
                <button className="btn btn-hipster close-btn" onClick={closeModal}>close</button>
                </div>
            </div>
        </aside>
    )
}

export default Modal