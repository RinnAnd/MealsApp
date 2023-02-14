import { useGlobalContext } from "../contex"
import { RiHeartAddLine } from 'react-icons/ri'

const Meals = () => {
    const {meals, loading, selectMeal, addToFavorites} = useGlobalContext()
    if(loading){
        return <section className="section">
            <h4>Loading...</h4>
        </section>
    } 
if(meals.length < 1){
    return <section className="section">
        <h4>No meals matched your search term. Please try again.</h4>
    </section>
}    

    return (
        <section className="section-center">
           {meals.map((singleMeal)=> {
            const {idMeal, strMeal:title, strMealThumb:image, strYoutube:link} = singleMeal
            return <article key={idMeal} className="single-meal">
                <img src={image} className="img" onClick={()=>selectMeal(idMeal)}/>
                <footer>
                    <h5>{title}</h5>
                    <a href={link} target="_blank">How to</a>
                    <button className="like-btn" onClick={()=>addToFavorites(idMeal)}><RiHeartAddLine /></button>
                </footer>
            </article>
           })}
        </section>
    )
}

export default Meals