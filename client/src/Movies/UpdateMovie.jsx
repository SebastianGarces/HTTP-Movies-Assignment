import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";

const UpdateMovie = () => {
	const { register, handleSubmit, reset } = useForm();

	const history = useHistory();
	const movieId = history.location.pathname.split("/")[
		history.location.pathname.split("/").length - 1
	];

	const onSubmit = data => {
		axios
			.put(`http://localhost:5000/api/movies/${movieId}`, {...data, id: movieId, stars: data.stars.split(',')})
            .then(res => {
                console.log('movie updated', res.data)
            })
            .catch(err => console.error(err));
            
        reset()
        history.push('/')
	};

	return (
		<div className="container">
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				<div className="input-group">
					<label htmlFor="title">Title</label>
					<input ref={register} type="text" name="title" />
				</div>
				<div className="input-group">
					<label htmlFor="director">Director</label>
					<input ref={register} type="text" name="director" />
				</div>
				<div className="input-group">
					<label htmlFor="metascore">Metascore</label>
					<input ref={register} type="text" name="metascore" />
				</div>
				<div className="input-group">
					<label htmlFor="stars">Stars</label>
					<input ref={register} type="text" name="stars" />
				</div>
				<button type="submit">Update</button>
			</form>
		</div>
	);
};

export default UpdateMovie;
