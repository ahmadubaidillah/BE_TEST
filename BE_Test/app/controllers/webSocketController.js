const axios = require("axios");
const { Op } = require("sequelize");
const db = require("../config/db");
const Surveys = require("../models/surveyModel");
const Users = require("../models/userModel");
const Attack = require("../models/attackModel");
const redis = require("redis");
const redisClient = redis.createClient({
  host: "localhost", // Replace with your Redis server host
  port: 6379, // Replace with your Redis server port
});

// Function to fetch data from the Radware API every 3 minutes using WebSockets
exports.callmeWebSocket = (req, res) => {
  // You can use a WebSocket library like 'ws' to implement WebSocket functionality.
  // Here's a simplified example using 'ws':
  const WebSocket = require("ws");

  const ws = new WebSocket(
    "wss://livethreatmap.radware.com/socket.io/?transport=websocket"
  );

  ws.on("open", () => {
    // Fetch data every 3 minutes
    setInterval(() => {
      ws.send("fetchData"); // Assuming the Radware API supports this command
    }, 3 * 60 * 1000); // 3 minutes in milliseconds

    console.log("WebSocket connected and fetching data...");
  });

  //   ws.on("message", (message) => {
  //     // Handle incoming data from the WebSocket
  //     const data = JSON.parse(message);

  //     // Process and store data in your database as needed
  //     // Example: Survey.create({ userId: data.userId, values: data.values });
  //   });

  ws.on("message", async (message) => {
    try {
      // Handle incoming data from the WebSocket
      const data = JSON.parse(message);

      // Start a transaction to ensure data consistency
      const transaction = await db.transaction();

      try {
        // Loop through the data and build a list of values to insert
        const valuesToInsert = data.map((attackData) => ({
          sourceCountry: attackData.sourceCountry,
          destinationCountry: attackData.destinationCountry,
          // Add more fields as needed
        }));

        // Perform the bulk insert with a native query
        await db.query(
          'INSERT INTO attacks ("sourceCountry", "destinationCountry") VALUES (?, ?), (?, ?), ...',
          {
            replacements: valuesToInsert.flatMap((attack) => [
              attack.sourceCountry,
              attack.destinationCountry,
            ]),
            type: db.QueryTypes.INSERT,
            transaction,
          }
        );

        // Commit the transaction if all insertions were successful
        await transaction.commit();

        console.log(`Stored ${data.length} attack records in the database.`);
      } catch (error) {
        // Rollback the transaction if an error occurs
        await transaction.rollback();
        console.error("Error inserting data:", error);
      }
    } catch (error) {
      console.error("Error processing WebSocket data:", error);
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  res.status(200).json({ success: true, message: "WebSocket initiated." });
};

// Function to retrieve data from the database
exports.getData = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT "destinationCountry", COUNT(*) AS total
      FROM Attack
      GROUP BY "destinationCountry"
      ORDER BY total DESC
      LIMIT 10
    `);

    const labels = results.map((row) => row.destinationCountry);
    const totals = results.map((row) => row.total);

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: { label: labels, total: totals },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// Check Redis
// exports.getData = async (req, res) => {
//   const cacheKey = "attacksData"; // Define a cache key

//   // Check if the data is cached in Redis
//   redisClient.get(cacheKey, async (error, cachedData) => {
//     if (error) {
//       console.error("Redis error:", error);
//     }

//     if (cachedData) {
//       // If data is found in the cache, return it
//       const parsedData = JSON.parse(cachedData);
//       res.status(200).json(parsedData);
//     } else {
//       // If data is not in the cache, fetch it from the database
//       try {
//         const [results] = await db.query(`
//             SELECT "destinationCountry", COUNT(*) AS total
//             FROM attack
//             GROUP BY "destinationCountry"
//             ORDER BY total DESC
//             LIMIT 10
//           `);

//         const labels = results.map((row) => row.destinationCountry);
//         const totals = results.map((row) => row.total);

//         const responseData = {
//           success: true,
//           statusCode: 200,
//           data: { label: labels, total: totals },
//         };

//         // Store the fetched data in the Redis cache with an expiration (e.g., 1 hour)
//         redisClient.setex(cacheKey, 3600, JSON.stringify(responseData));

//         res.status(200).json(responseData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         res
//           .status(500)
//           .json({
//             success: false,
//             statusCode: 500,
//             message: "Internal server error",
//           });
//       }
//     }
//   });
// };
