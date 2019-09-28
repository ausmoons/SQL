import { Database } from "../src/database";
import { minutes } from "./utils";
import { CsvLoader } from "../src/data/csv-loader";
import _ from "lodash";
import {
  selectTotalBudgetAndRevenueByAdjustedFinancialData,
  selectCountFromMoviesWhereBudgetWasMoreThan100000000AndReleaseDateAfter2009,
  selectTopThreeMoviesOrderByBudgetWhereReleaseDataIsAfter2009,
  selectCountOfMoviesWhereHomepageIsSecure,
  selectCountOfMoviesReleasedEveryYear,
  selectTopThreeUsersWhichLeftMostRatings,
  selectCountOfRatingsLeftEachMonth,
  selectCountOfTop3MonthsFrom2015WhenReleasedMostOfMOvies,
  selectCountOfMoviesWhereOriginalTitleConsistOfWordLove,
  selectTop3MovieIdWhichHaveTheMostRatingsOver3
} from "../src/queries/select";
import { MOVIES, MOVIE_RATINGS } from "../src/table-names";

describe("Simple Queries", () => {
  let db: Database;

  beforeAll(async () => {
    db = await Database.fromExisting("05", "06");
  }, minutes(3));

  it(
    "should select total budget and revenue from movies, by using adjusted financial data",
    async done => {
      const query = selectTotalBudgetAndRevenueByAdjustedFinancialData(MOVIES);
      const result = await db.selectSingleRow(query);

      expect(result).toEqual({
        total_budget: 190130349695.48,
        total_revenue: 555818960433.08
      });

      done();
    },
    minutes(3)
  );

  it(
    "should select count from movies where budget was more than 100000000 and release date after 2009",
    async done => {
      const query = selectCountFromMoviesWhereBudgetWasMoreThan100000000AndReleaseDateAfter2009(MOVIES);
      const result = await db.selectSingleRow(query);

      expect(result.count).toBe(282);

      done();
    },
    minutes(3)
  );

  it(
    "should select top three movies order by budget where release data is after 2009",
    async done => {
      const query = selectTopThreeMoviesOrderByBudgetWhereReleaseDataIsAfter2009(MOVIES);
      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          original_title: "The Warrior's Way",
          budget: 425000000.0,
          revenue: 11087569.0
        },
        {
          original_title: "Pirates of the Caribbean: On Stranger Tides",
          budget: 380000000.0,
          revenue: 1021683000.0
        },
        {
          original_title: "Pirates of the Caribbean: At World's End",
          budget: 300000000.0,
          revenue: 961000000.0
        }
      ]);

      done();
    },
    minutes(3)
  );

  it(
    "should select count of movies where homepage is secure (starts with https)",
    async done => {
      const query = selectCountOfMoviesWhereHomepageIsSecure(MOVIES);
      const result = await db.selectSingleRow(query);

      expect(result.count).toBe(82);

      done();
    },
    minutes(3)
  );

  it(
    "should select count of movies released every year",
    async done => {
      const query = selectCountOfMoviesReleasedEveryYear(MOVIES);
      const result = await db.selectMultipleRows(query);

      expect(result.length).toBe(56);
      expect(result.slice(0, 3)).toEqual([
        {
          count: 627,
          year: "2015"
        },
        {
          count: 696,
          year: "2014"
        },
        {
          count: 656,
          year: "2013"
        }
      ]);

      done();
    },
    minutes(3)
  );

  it(
    "should select top three users which left most ratings",
    async done => {
      const query = selectTopThreeUsersWhichLeftMostRatings(MOVIE_RATINGS);
      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          user_id: 8659,
          count: 349
        },
        {
          user_id: 179792,
          count: 313
        },
        {
          user_id: 107720,
          count: 294
        }
      ]);

      done();
    },
    minutes(3)
  );

  it(
    "should select count of ratings left each month",
    async done => {
      const query = selectCountOfRatingsLeftEachMonth(MOVIE_RATINGS);
      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          count: 161252,
          month: "11"
        },
        {
          count: 146804,
          month: "12"
        },
        {
          count: 144545,
          month: "07"
        },
        {
          count: 141643,
          month: "10"
        },
        {
          count: 136058,
          month: "06"
        },
        {
          count: 131934,
          month: "01"
        },
        {
          count: 130411,
          month: "05"
        },
        {
          count: 129070,
          month: "03"
        },
        {
          count: 127299,
          month: "08"
        },
        {
          count: 119368,
          month: "04"
        },
        {
          count: 108811,
          month: "02"
        },
        {
          count: 103819,
          month: "09"
        }
      ]);

      done();
    },
    minutes(3)
  );



it(
  "should select count of top 3 months from 2015 when released most of movies",
  async done => {
    const query = selectCountOfTop3MonthsFrom2015WhenReleasedMostOfMOvies(MOVIES);
    const result = await db.selectMultipleRows(query);

    expect(result).toEqual([
      {
        count: 74,
        year: "2015",
        month: "09"
      },
      {
        count: 71,
        year: "2015",
        month: "08"
      },
      {
        count: 71,
        year: "2015",
        month: "10"
      }
    ]);

    done();
  },
  minutes(3)
);

it(
  "should select count of movies where original title consist of word love",
  async done => {
    const query = selectCountOfMoviesWhereOriginalTitleConsistOfWordLove(MOVIES);
    const result = await db.selectSingleRow(query);

    expect(result.count).toBe(126);

    done();
  },
  minutes(3)
);

it(
  "should select top three movie id which have the most ratings over 3",
  async done => {
    const query = selectTop3MovieIdWhichHaveTheMostRatingsOver3(MOVIE_RATINGS);
    const result = await db.selectMultipleRows(query);

    expect(result).toEqual([
      {
        movie_id: 8745,
        count: 20875
      },
      {
        movie_id: 4930,
        count: 18147
      },
      {
        movie_id: 4224,
        count: 14696
      }
    ]);

    done();
  },
  minutes(3)
);
});

