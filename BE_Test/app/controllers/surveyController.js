const db = require("../config/db");
const Surveys = require("../models/surveyModel");
// const Surveys = db.Surveys;
const { QueryTypes } = require("sequelize");

exports.refactoreMe1 = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM surveys", {
      type: QueryTypes.SELECT,
    });

    const totalIndex = Array.from({ length: 5 }, (_, index) => {
      const values = data.map((e) => e.values[index]);
      const total = values.reduce((acc, value) => acc + value, 0) / data.length;
      return total;
    });

    res.status(200).send({
      statusCode: 200,
      success: true,
      data: totalIndex,
    });
  } catch (error) {
    console.error(error.message);
    console.error(error);
    res.status(500).send({
      statusCode: 500,
      success: false,
      message: "Failed to retrieve data.",
    });
  }
};

exports.refactoreMe2 = async (req, res) => {
  const { userId, values, id } = req.body;

  try {
    await db.transaction(async (t) => {
      // Menjalankan query native untuk insert survey
      await db.query(
        `
        INSERT INTO "surveys" ("userId", "values", "createdAt", "updatedAt")
        VALUES ($userId, $values, NOW(), NOW())
      `,
        {
          bind: {
            userId,
            values,
          },
          type: QueryTypes.INSERT,
          transaction: t, // Gunakan parameter transaction di sini
        }
      );

      // Menjalankan query native untuk mengupdate dosurvey
      await db.query(
        `
        UPDATE "users"
        SET "dosurvey" = true
        WHERE "id" = $id
      `,
        {
          bind: {
            id,
          },
          type: QueryTypes.UPDATE,
          transaction: t, // Gunakan parameter transaction di sini
        }
      );
    });

    res.status(201).send({
      statusCode: 201,
      message: "Survey sent successfully!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 500,
      message: "Cannot post survey.",
      success: false,
    });
  }
};

// exports.refactoreMe2 = async (req, res) => {
//   const { userId, values, id } = req.body;

//   try {
//     await db.transaction(async (transaction) => {
//       // Menjalankan query native untuk insert survey
//       await db.query(
//         `
//         INSERT INTO "Surveys" ("userId", "values", "createdAt", "updatedAt")
//         VALUES ($userId, $values, NOW(), NOW())
//       `,
//         {
//           bind: {
//             userId,
//             values,
//           },
//           type: QueryTypes.INSERT,
//           transaction,
//         }
//       );

//       // Menjalankan query native untuk mengupdate dosurvey
//       await db.query(
//         `
//         UPDATE "Users"
//         SET "dosurvey" = true
//         WHERE "id" = $id
//       `,
//         {
//           bind: {
//             id,
//           },
//           type: QueryTypes.UPDATE,
//           transaction,
//         }
//       );
//     });

//     res.status(201).send({
//       statusCode: 201,
//       message: "Survey sent successfully!",
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       statusCode: 500,
//       message: "Cannot post survey.",
//       success: false,
//     });
//   }
// };

// exports.refactoreMe2 = async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     const values = req.body.values;

//     const surveyInsertQuery = `
//       INSERT INTO "Surveys" ("userId", "values", "createdAt", "updatedAt")
//       VALUES (${userId}, '${values}', NOW(), NOW())
//       RETURNING id;
//     `;

//     const surveyResult = await db.query(surveyInsertQuery, {
//       type: QueryTypes.SELECT,
//     });
//     console.log(surveyResult);
//     const surveyId = surveyResult[0].id;

//     const userUpdateQuery = `
//       UPDATE "Users"
//       SET "dosurvey" = true
//       WHERE "id" = ${req.body.id};
//     `;

//     await db.query(userUpdateQuery, {
//       type: QueryTypes.UPDATE,
//     });

//     res.status(200).send({
//       statusCode: 200,
//       message: "Survey sent successfully!",
//       success: true,
//       // surveyId,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       statusCode: 500,
//       message: "Cannot post survey.",
//       success: false,
//     });
//   }
// };

// exports.refactoreMe2 = async (req, res) => {
//   const { userId, values, id } = req.body;

//   try {
//     await db.transaction(async (transaction) => {
//       await db.query(
//         'INSERT INTO "Surveys" ("userId", "values", "createdAt", "updatedAt") VALUES (:userId, :values, NOW(), NOW())',
//         {
//           replacements: { userId, values },
//           type: QueryTypes.INSERT,
//           transaction,
//         }
//       );

//       await db.query('UPDATE "Users" SET "dosurvey" = true WHERE "id" = :id', {
//         replacements: { id },
//         type: QueryTypes.UPDATE,
//         transaction,
//       });
//     });

//     res.status(201).send({
//       statusCode: 201,
//       message: "Survey sent successfully!",
//       success: true,
//     });
//   } catch (error) {
//     console.error(error.message);
//     console.error(error);
//     res.status(500).send({
//       statusCode: 500,
//       message: "Cannot post survey.",
//       success: false,
//     });
//   }
// };

// exports.refactoreMe2 = async (req, res) => {
//   try {
//     await db.transaction(async (transaction) => {
//       await Surveys.create({
//         userId: req.body.userId,
//         values: req.body.values,
//       });

//       await Users.update(
//         {
//           dosurvey: true,
//         },
//         {
//           where: { id: req.body.id },
//           transaction,
//         }
//       );
//     });

//     res.status(201).send({
//       statusCode: 201,
//       message: "Survey sent successfully!",
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       statusCode: 500,
//       message: "Cannot post survey.",
//       success: false,
//     });
//   }
// };
