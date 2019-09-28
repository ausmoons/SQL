import { Database } from "../src/database";
import { minutes } from "./utils";
import _ from "lodash";

describe("Update Queries", () => {
  let db: Database;

  beforeAll(async () => {
    db = await Database.fromExisting("08", "09");
  }, minutes(3));


it(
    "should update genre name",
    async done => {
    const update = `UPDATE genres SET genre = "Mostly for kids" WHERE id = 3`; 
    const select = `SELECT genres.id, genre 
    FROM genres 
    JOIN movie_genres  ON movie_genres.genre_id =  genres.id 
    WHERE genres.id = 3
    GROUP BY genres.id`
    db.selectMultipleRows(update);
    const result = await db.selectMultipleRows(select);
  
      expect(result).toEqual([
        {
          id: 3,
          genre: "Mostly for kids"
        }
      ]);
  
      done();
    },
    minutes(3)
  );

  it(
    "should update Chris Pratt name",
    async done => {
    const name = "Chris Pratt"; 
    const update = `UPDATE actors SET full_name = "Christopher New" WHERE full_name = '${name}'`; 
    const select = `SELECT full_name
    FROM actors
    WHERE full_name = "Christopher New"
    GROUP BY full_name`
    db.selectSingleRow(update);
    const result = await db.selectSingleRow(select);
  
      expect(result).toEqual(
        {
          full_name:"Christopher New"
        }
      );
  
      done();
    },
    minutes(3)
  );

  it(
    "should update empty tagline",
    async done => {
    const update = `UPDATE movies SET tagline = "We won't tell you anything.You should see it by yourself" WHERE tagline = ""`; 
    const select = `SELECT tagline
    FROM movies
    WHERE tagline = "We won't tell you anything.You should see it by yourself"`
    db.selectSingleRow(update);
    const result = await db.selectSingleRow(select);
  
      expect(result).toEqual(
        {
          tagline:"We won't tell you anything.You should see it by yourself"
        }
    );
  
      done();
    },
    minutes(3)
  );
  });