import db from "../config/db.js";

const userModel = {
  insert: (username, password) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (username,password) VALUES ('${username}','${password}')`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  loginUser: (username) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from users where username='${username}' `,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  insertRefreshToken: (refresh_token) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (refresh_token) VALUES ('${refresh_token}')`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  selectRefreshToken: (refresh_token) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from users where refresh_token='${refresh_token}' `,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
};

export default userModel;
