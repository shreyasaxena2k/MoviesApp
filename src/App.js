import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Filter from "./Filter";
import Navbar from "./Navbar";
import Search from "./Search";
import Table from "./Table";
import Login from "./Login";
import Customer from "./Customer";
import Rentals from "./Rentals";


class App extends React.Component {
  state = {
    movies: [],
    genre: [],
    selectedFilter: "All Genre",
    search: "",
  };

  updateSearch = (searchString) => {
    this.setState({
      search: searchString
    })
  }
  setFilter = (filter) => {
    this.setState({ selectedFilter: filter });
  };

  toggleLike = (id) => {
    let index = this.state.movies.findIndex((el) => {
      return el._id === id;
    });

    let currMoviesArr = this.state.movies.map((el) => el);

    if (currMoviesArr[index].liked) {
      currMoviesArr[index].liked = false;
    } else {
      currMoviesArr[index].liked = true;
    }

    this.setState({ movies: currMoviesArr });
  };

  deleteMovie = (id) => {
    let filteredArr = this.state.movies.filter((el) => {
      return el._id !== id;
    });

    this.setState({ movies: filteredArr });
  };

  componentDidMount() {
    let f = async () => {
      let responseGenre = await fetch("http://localhost:4000/genre");
      let responseMovies = await fetch("http://localhost:4000/movies");
      let moviesJson = await responseMovies.json();
      let genreJson = await responseGenre.json();

      this.setState({
        movies: moviesJson,
        genre: genreJson,
      });
    };

    f();
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/rentals">
              <Rentals />
            </Route>
            <Route exact path="/customer">
              <Customer />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/">

              <div className="row">
                <Filter
                  handleFilter={this.setFilter}
                  selectedFilter={this.state.selectedFilter}
                  genreData={this.state.genre}
                />

                <div className="col-9 p-4">
                  <Search
                    total={this.state.movies.length}
                    updateSearch={this.updateSearch}
                    search={this.state.search}
                  />
                  <Table
                    deleteMovie={this.deleteMovie}
                    toggleLike={this.toggleLike}
                    selectedFilter={this.state.selectedFilter}
                    moviesData={this.state.movies}
                  />
                </div>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
