import { Database } from "../src/database";
import { minutes } from "./utils";
import {
    shouldSelectTopThreeDirectorsOrderedByTotalBudgetSpentInTheirMovies,
    selectTop10KeywordsOrderedByTheirAppearanceInMovies,
    selectOneMovieWhichHasHighestCountOfActors,
    selectThreeGenresWhichHasMostRatingsWith5Stars,
    selectTopThreeGenresOrderedByAverageRating,
    selectTopThreeActorsOrderedByAppearanceInMovies,
    select5ProductionCompaniesOrderedByAmountOfProducedMovies,
    select5TaglinesAndShowTheirMovieGenreOrderedByLenghtOfCharacters
  } from "../src/queries/select";
import { MOVIES, ACTORS, PRODUCTION_COMPANIES } from "../src/table-names";

describe("Queries Across Tables", () => {
  let db: Database;

  beforeAll(async () => {
    db = await Database.fromExisting("06", "07");
  }, minutes(3));

  it(
    "should select top three directors ordered by total budget spent in their movies",
    async done => {
            const query = shouldSelectTopThreeDirectorsOrderedByTotalBudgetSpentInTheirMovies(MOVIES);
      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          director: "Steven Spielberg",
          total_budget: 2173663066.68
        },
        {
          director: "Ridley Scott",
          total_budget: 1740157354.14
        },
        {
          director: "Michael Bay",
          total_budget: 1501996071.5
        }
      ]);

      done();
    },
    minutes(3)
  );

  it(
    "should select top 10 keywords ordered by their appearance in movies",
    async done => {
            const query = selectTop10KeywordsOrderedByTheirAppearanceInMovies(MOVIES);
      const result = await db.selectMultipleRows(query);


      expect(result).toEqual([
        {
          keyword: "woman director",
          count: 411
        },
        {
          keyword: "independent film",
          count: 394
        },
        {
          keyword: "based on novel",
          count: 278
        },
        {
          keyword: "sex",
          count: 272
        },
        {
          keyword: "sport",
          count: 216
        },
        {
          keyword: "murder",
          count: 204
        },
        {
          keyword: "musical",
          count: 169
        },
        {
          keyword: "biography",
          count: 168
        },
        {
          keyword: "new york",
          count: 163
        },
        {
          keyword: "suspense",
          count: 157
        }
      ]);

      done();
    },
    minutes(3)
  );

  it(
    "should select one movie which has highest count of actors",
    async done => {
            const query = selectOneMovieWhichHasHighestCountOfActors(MOVIES);
      const result = await db.selectSingleRow(query);

      expect(result).toEqual({
        original_title: "Hamlet",
        count: 20
      });

      done();
    },
    minutes(3)
  );

  it(
    "should select three genres which has most ratings with 5 stars",
    async done => {
            const query = selectThreeGenresWhichHasMostRatingsWith5Stars(MOVIES);
      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          genre: "Drama",
          five_stars_count: 143663
        },
        {
          genre: "Thriller",
          five_stars_count: 96265
        },
        {
          genre: "Comedy",
          five_stars_count: 81184
        }
      ]);

      done();
    },
    minutes(3)
  );

  it(
    "should select top three genres ordered by average rating",
    async done => {
            const query = selectTopThreeGenresOrderedByAverageRating(MOVIES) ;
      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          genre: "Western",
          avg_rating: 3.64
        },
        {
          genre: "Crime",
          avg_rating: 3.62
        },
        {
          genre: "Animation",
          avg_rating: 3.6
        }
      ]);

      done();
    },
    minutes(3)
  );
  it(
    "should select top 3 actors ordered by appearance in movies",
    async done => {
            const query = selectTopThreeActorsOrderedByAppearanceInMovies(ACTORS);
      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          Actor: "Robert De Niro",
          Amount: 72
        },
        {
          Actor: "Samuel L. Jackson",
          Amount: 71
        },
        {
          Actor: "Bruce Willis",
          Amount: 62
        }
      ]);

      done();
    },
    minutes(3)
  );

  it(
    "should select top 5 production companies ordered by amount of produced movies",
    async done => {
            const query = select5ProductionCompaniesOrderedByAmountOfProducedMovies(PRODUCTION_COMPANIES);
      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          Company: "Universal Pictures",
          Amount: 520
        },
        {
          Company: "Warner Bros.",
          Amount: 506
        },
        {
          Company: "Paramount Pictures",
          Amount: 430
        },
        {
          Company: "Twentieth Century Fox Film Corporation",
          Amount: 281
        },
        {
          Company: "Columbia Pictures",
          Amount: 269
        }
      ]);

      done();
    },
    minutes(3)
  );
  it(
    "should select 5 taglines and show their movie genre ordered by lenght of characters",
    async done => {
            const query = select5TaglinesAndShowTheirMovieGenreOrderedByLenghtOfCharacters(MOVIES);
      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          "Length Of Tagline": 286,
          Genre: "Comedy"
        },
        {
          "Length Of Tagline": 277,
          Genre: "Crime"
        },
        {
          "Length Of Tagline": 252,
          Genre: "Drama"
        },
        {
          "Length Of Tagline": 240,
          Genre: "Thriller"
        },
        {
          "Length Of Tagline": 234,
          Genre: "Mystery"
        }
      ]);

      done();
    },
    minutes(3)
  );

});
