import { useState } from "react";
import { useGlobalContext } from "../contex";


const Search = () => {
    const [text, setText] = useState('')

    const {setSearchTerm, fetchRandom} = useGlobalContext()

    const handleChange = (e) => {
        setText(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(text){
            setSearchTerm(text)
        }
    }

    return (
        <header className="search-container">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Type meals" value={text} onChange={handleChange} className="form-input"/>
                <button type="submit" className="btn">Search</button>
                <button type="button" className="btn btn-hipster" onClick={fetchRandom}>Surprise me</button>
            </form>
        </header>
    )
}

export default Search