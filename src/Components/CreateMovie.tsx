import { useState, useEffect } from "react";
import { getSeatingData, createMovie } from "../Data/api";
import { useLocation, useNavigate } from "react-router-dom";
import { Movie, SeatingArray, LocationStateNewMovie } from "../ts/interfaces";

function CreateMovie(): JSX.Element {
    const [seatingDataNewMovie, setSeatingDataNewMovie] = useState<SeatingArray>(
        []
    );
    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const location = useLocation();
    const navigate = useNavigate();
    const { amountOfMovies } = (location.state as LocationStateNewMovie) || {
        amountOfMovies: undefined,
    };

    useEffect(() => {
        const fetchSeatingData = async () => {
            try {
                const seatingArray = await getSeatingData();
                if (Array.isArray(seatingArray)) {
                    setSeatingDataNewMovie(seatingArray);
                } else {
                    console.log("Failed to load seating data in create movie.");
                }
            } catch (error) {
                console.error("Error fetching seating data:", error);
            }
        };
        fetchSeatingData();
    }, []);

    const createNewMovie = (): Movie => {
        return {
            id: `${amountOfMovies + 1}`,
            title,
            price,
            seatingData: seatingDataNewMovie,
        };
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const newMovie = createNewMovie();

        try {
            const response = await createMovie(newMovie);

            if (response)
            {
                navigate('/admin');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div id="createNewMovie">
                <h1>Create a new movie</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" onChange={(event) => setTitle(event.target.value.trim())} required></input>
                    {/* Förlåt för denna br, vi skulle inte bry oss om styligen men det gjorde för ont i ögonen att ha två inputs bredvid varandra så denna snabba lösning fick det bli */}
                    <br></br>
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" onChange={(event) => setPrice(Number(event.target.value.trim()))}required></input>
                    <div className='button-group'>
                        <button type="submit">Create</button>
                        <button className="cancel-button" onClick={() => navigate("/")}>Cancel</button>
                        <p>When you have created a new movie you will be redirected to the admin page and there you should see the movie in the list of movies.</p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateMovie;
