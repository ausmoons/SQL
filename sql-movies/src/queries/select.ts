import { DH_CHECK_P_NOT_PRIME } from "constants";
import { deepStrictEqual } from "assert";


export const selectActorByName = (fullName: string): string => {
  return (`SELECT full_name
  FROM ACTORS WHERE full_name = '${fullName}'
  `);
};

export const selectKeyword = (keyword: string): string => {
  return (` SELECT keyword
  FROM KEYWORDS WHERE keyword = '${keyword}'
  `);
};

export const selectDirector = (director: string): string => {
  return (` SELECT full_name
  FROM DIRECTORS WHERE full_name = '${director}'
  `);
};

export const selectGenre = (genre: string): string => {
  return (` SELECT genre
  FROM GENRES WHERE genre = '${genre}'
  `);
};

export const selectProductionCompany = (company: string): string => {
  return (` SELECT company_name
  FROM PRODUCTION_COMPANIES WHERE company_name = '${company}'
  `);
};
export const selectMovieById = (id: number): string => {
  return (`SELECT original_title
  FROM MOVIES WHERE id = '${id}'
  `);
};

export const selectGenreById = (id: number): string => {
  return (`SELECT genre
  FROM GENRES WHERE id = '${id}'
  `);
};

export const selectDirectorById = (id: number): string => {
  return (`SELECT full_name
  FROM DIRECTORS WHERE id = '${id}'
  `);
};

export const selectActorById = (id: number): string => {
  return (`SELECT full_name
  FROM ACTORS WHERE id = '${id}'
  `);
};

export const selectKeywordById = (id: number): string => {
  return (`SELECT keyword
  FROM KEYWORDS WHERE id = '${id}'
  `);
};

export const selectProductionCompanyById = (id: number): string => {
  return (`SELECT company_name
  FROM PRODUCTION_COMPANIES WHERE id = '${id}'
  `);
};

export const selectMovie = (imdbId: string): string => {
  return (` SELECT original_title, id
  FROM MOVIES WHERE imdb_id = '${imdbId}'
  `);
};

export const selectMovieId = (imdbId: string): string => {
  return (` SELECT id
  FROM MOVIES WHERE imdb_id = '${imdbId}'
  `);
};

export const selectRatingsByUserID = (userId: number): string => {
  return (` SELECT user_id, movie_id, rating, time_created
  FROM MOVIE_RATINGS WHERE user_id = '${userId}'
  `);
};

export const selectGenresByMovieId = (movieId: number): string => {
  return `select g.genre from movie_genres mg join genres 
  g on g.id = mg.genre_id where mg.movie_id = ${movieId}`;
};

export const selectActorsByMovieId = (movieId: number): string => {
  return `select a.full_name from movie_actors ma join 
  actors a on a.id = ma.actor_id where ma.movie_id = ${movieId}`;
};

export const selectDirectorsByMovieId = (movieId: number): string => {
  return `select d.full_name from movie_directors md join
   directors d on d.id = md.director_id where md.movie_id = ${movieId}`;
};

export const selectKeywordsByMovieId = (movieId: number): string => {
  return `select k.keyword from movie_keywords 
  mk join keywords k on k.id = mk.keyword_id where mk.movie_id = ${movieId}`;
};

export const selectProductionCompaniesByMovieId = (movieId: number): string => {
  return `select pc.company_name from movie_production_companies 
  mpc join production_companies pc on pc.id = mpc.company_id where mpc.movie_id = ${movieId}`;
};

/**
 * select count as c, because an object is returned and expected property name is c
 */
export const selectCount = (table: string): string => {
  return ( `SELECT COUNT (*)  AS c
  FROM ${table}
  `);
    
};

export const selectAllRows = (table: string): string => {
  return (`SELECT * FROM ${table}`);
};


export const selectTotalBudgetAndRevenueByAdjustedFinancialData = (table: string): string => {
  return (` SELECT ROUND(SUM(budget_adj),2) AS total_budget, 
  ROUND(SUM(revenue_adj),2) AS total_revenue
  FROM ${table}
  `);
};

export const selectCountFromMoviesWhereBudgetWasMoreThan100000000AndReleaseDateAfter2009 = (table: string): string => {
  return (` SELECT COUNT (*) AS count
  FROM ${table}
  WHERE (budget > 100000000
  AND
  release_date >= 1/1/2009)
  `);
};


export const selectTopThreeMoviesOrderByBudgetWhereReleaseDataIsAfter2009 = (table: string): string => {
  return (` SELECT budget, original_title, revenue
  FROM ${table}
  WHERE (release_date >= 1/1/2009)
  ORDER BY budget DESC
  LIMIT 3
  `);
};


export const selectCountOfMoviesWhereHomepageIsSecure = (table: string): string => {
  return (` SELECT COUNT (*) AS count
  FROM ${table}
  WHERE homepage LIKE 'https%'
  `);
};

export const selectCountOfMoviesReleasedEveryYear = (table: string): string => {
  return (` SELECT COUNT(*)  AS count,
  SUBSTR(release_date, 1, 4) AS year
  FROM ${table}
  GROUP BY year
  ORDER BY year DESC
  `);
};


export const selectTopThreeUsersWhichLeftMostRatings = (table: string): string => {
  return (` SELECT  user_id, COUNT(*)  AS count
  FROM ${table}
  GROUP BY user_id
  ORDER BY count DESC
  LIMIT 3
  `);
};

export const selectCountOfRatingsLeftEachMonth = (table: string): string => {
  return (` SELECT COUNT(*)  AS count,
  SUBSTR(time_created, 6, 2) AS month
  FROM ${table}
  GROUP BY month
  ORDER BY count DESC
  `);
};


export const selectCountOfTop3MonthsFrom2015WhenReleasedMostOfMOvies = (table: string): string => {
  return (` SELECT COUNT(*)  AS count,
  SUBSTR(release_date, 1, 4) AS year,
  SUBSTR(release_date, 6, 2) AS month
  FROM movies
  WHERE year = '2015'
  GROUP BY month
  ORDER BY count DESC
  LIMIT 3
  `);
};


export const selectCountOfMoviesWhereOriginalTitleConsistOfWordLove = (table: string): string => {
  return (` SELECT COUNT(*)  AS count
  FROM movies
  WHERE original_title LIKE "%love%"

  `);
};

export const selectTop3MovieIdWhichHaveTheMostRatingsOver3 = (table: string): string => {
  return (` SELECT movie_id, COUNT(movie_id) AS count
  FROM movie_ratings
  WHERE (rating > 3)
  GROUP BY movie_id
  ORDER BY count DESC
  LIMIT 3
  `);
};

export const shouldSelectTopThreeDirectorsOrderedByTotalBudgetSpentInTheirMovies = (table: string): string => {
  return (` SELECT  full_name AS director ,  ROUND(SUM(budget_adj),2) AS total_budget
  FROM movies
   JOIN  movie_directors  ON movie_directors.movie_id = movies.id
   JOIN  directors  ON movie_directors.director_id = directors.id
   GROUP BY full_name
   ORDER BY total_budget DESC
   LIMIT 3

  `);
};


export const selectTop10KeywordsOrderedByTheirAppearanceInMovies = (table: string): string => {
  return (` SELECT keyword, COUNT(keyword) AS count
  FROM keywords
   JOIN  movies  ON movie_keywords.movie_id = movies.id
   JOIN  movie_keywords  ON movie_keywords.keyword_id = keywords.id
  GROUP BY keyword
  ORDER BY count DESC
  LIMIT 10
  `);
};



export const selectOneMovieWhichHasHighestCountOfActors = (table: string): string => {
  return (`SELECT original_title,  COUNT(original_title) AS count
  FROM actors
  JOIN movies  ON movie_actors.movie_id = movies.id
  JOIN movie_actors ON movie_actors.actor_id = actors.id
  GROUP BY original_title
  ORDER BY count DESC
  `);
};

export const selectThreeGenresWhichHasMostRatingsWith5Stars = (table: string): string => {
  return (`SELECT genre, count(genre) AS five_stars_count
  FROM movie_ratings
  JOIN movies ON movie_ratings.movie_id = movies.id
  JOIN movie_genres  ON movie_genres.movie_id =  movies.id
  JOIN genres  ON genres.id =  movie_genres.genre_id
  WHERE rating = "5.0"
  GROUP BY genre
  ORDER BY five_stars_count DESC
  LIMIT 3
  `);
};

export const selectTopThreeGenresOrderedByAverageRating = (table: string): string => {
  return (`SELECT genre, ROUND(AVG(rating),2) AS avg_rating
  FROM movie_ratings
  JOIN movies ON movie_ratings.movie_id = movies.id
  JOIN movie_genres  ON movie_genres.movie_id =  movies.id
  JOIN genres  ON genres.id =  movie_genres.genre_id
  GROUP BY genre
  ORDER BY avg_rating DESC
  LIMIT 3
  `);
};

export const selectTopThreeActorsOrderedByAppearanceInMovies = (table: string): string => {
  return (`SELECT full_name as Actor, count(*) AS Amount
  FROM actors
  JOIN movie_actors ON movie_actors.actor_id = actors.id
  JOIN movies ON movie_actors.movie_id = movies.id
  GROUP BY Actor
  ORDER BY Amount DESC
  LIMIT 3
  `);
};

export const select5ProductionCompaniesOrderedByAmountOfProducedMovies  = (table: string): string => {
  return (`SELECT company_name AS Company, count(*) AS Amount
  from production_companies
  JOIN movie_production_companies ON production_companies.id = movie_production_companies.company_id
  JOIN movies ON movies.id = movie_production_companies.movie_id
  GROUP BY company_name
  ORDER BY Amount DESC
  LIMIT 5
    
  `);
};

export const select5TaglinesAndShowTheirMovieGenreOrderedByLenghtOfCharacters = (table: string): string => {
  return (`SELECT LENGTH(tagline) AS 'Length Of Tagline', genre as Genre
  FROM movies
  JOIN movie_genres ON movie_genres.movie_id = movies.id
  JOIN genres ON genres.id = movie_genres.genre_id
  GROUP BY tagline
  ORDER BY LENGTH(tagline) DESC
  LIMIT 5  
  `);
};
