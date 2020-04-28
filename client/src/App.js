import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";
import UpdateMovie from "./Movies/UpdateMovie";

const App = () => {
	const [savedList, setSavedList] = useState([]);
	const [movieList, setMovieList] = useState([]);

	const getMovieList = () => {
		axios
			.get("http://localhost:5000/api/movies")
			.then(res => setMovieList(res.data))
			.catch(err => console.log(err.response));
	};

	const addToSavedList = movie => {
		setSavedList([...savedList, movie]);
	};

	useEffect(() => {
		console.log('fetchingMovies')
		getMovieList();
	}, []);

	return (
		<>
			<SavedList list={savedList} />

			<Switch>
				<Route exact path="/">
					<MovieList movies={movieList} />
				</Route>

				<Route path="/update-movie/:id">
					<UpdateMovie />
				</Route>

				<Route path="/movies/:id">
					<Movie addToSavedList={addToSavedList} />
				</Route>
			</Switch>
		</>
	);
};

export default App;
