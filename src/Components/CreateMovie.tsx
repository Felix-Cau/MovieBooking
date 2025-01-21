import { useState, useEffect } from "react";
import { getSeatingData, createMovie } from "../Data/api";
import { useLocation, useNavigate } from "react-router-dom";
import { Movie, SeatingArray, LocationStateNewMovie, FormValuesCreateMovie } from "../ts/interfaces";
import { useFormik } from "formik";

function CreateMovie(): JSX.Element {
    const [seatingDataNewMovie, setSeatingDataNewMovie] = useState<SeatingArray>([]);
    const location = useLocation();
    const navigate = useNavigate();

    const generateGUID = (): string => {
        return crypto.randomUUID();
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

    const formik = useFormik<FormValuesCreateMovie>({
        initialValues: {
            title: '',
            price: 0,
        },
        enableReinitialize: true,
        validate: (values) => {
            const errors: { title?: string; price?: string } = {};

            if (!values.title || values.title.trim().length < 2) {
                errors.title = 'Title must be at least 3 characters long.';
            }

            if (!values.price || Number(values.price) <= 0) {
                errors.price = 'Price must be a positive number.';
            }
            return errors;
        },
        onSubmit: async (values) => {
            const newMovie: Movie = {
                id: generateGUID(),
                ...values,
                seatingData: seatingDataNewMovie,
            };
            try {
                const response = await createMovie(newMovie);

                if (response) {
                    navigate("/admin");
                }
            } catch (error) {
                console.error(error);
            }
        }
    })

    return (
        <>
            <div id="createNewMovie">
                <h1>Create a new movie</h1>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        required />
                        {formik.touched.title && formik.errors.title ? (
                            <div className='error'>{formik.errors.title}</div>
                        ) : null}
                    {/* Förlåt för denna br, vi skulle inte bry oss om styligen men det gjorde för ont i ögonen att ha två inputs bredvid varandra så denna snabba lösning fick det bli */}
                    <br></br>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        required />
                        {formik.touched.price && formik.errors.price ? (
                            <div className='error'>{formik.errors.price}</div>
                        ) : null}
                    <div className="button-group">
                        <button type="submit">Create</button>
                        <button className="cancel-button" onClick={() => navigate("/admin")}>
                            Cancel
                        </button>
                        <p>
                            When you have created a new movie you will be redirected to the
                            admin page and there you should see the movie in the list of
                            movies.
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateMovie;
