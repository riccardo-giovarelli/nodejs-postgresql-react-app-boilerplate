import express from "express";
import pool from "../../../db.ts";
import { authenticationMiddleware } from "../users.lib.ts";

const router = express.Router();

/**
 * GET: Retrieve User Information
 *
 * @description Retrieves the user's information based on the email stored in the session. The route is protected by
 * the `authenticationMiddleware`, which ensures that only authenticated users can access it. If the user is found,
 * it responds with the user's first name, last name, and email. If no user is found, it responds with an error message.
 *
 * @route GET /
 * @access Protected (requires authentication)
 * @returns {Object} A JSON object with a code and message indicating the result of the retrieval process.
 */
router.get("/", authenticationMiddleware, async (req, res) => {
  try {
    const query = {
      name: "get-user-by-email",
      text: 'SELECT "firstName", "lastName", "email" FROM users WHERE "email" = $1;',
      values: [req.session.username],
    };

    const results = await pool.query(query);

    if ((results?.rowCount ?? 0) === 0) {
      res.status(404).json({
        code: "GET_USER_ERROR",
        message: "Error retrieving user information",
        details: "No user found",
      });
      return;
    }

    res.status(200).json({
      code: "GET_USER_SUCCESS",
      message: "Successfully retrieved user information",
      details: {
        firstName: results.rows[0].firstName,
        lastName: results.rows[0].lastName,
        email: results.rows[0].email,
      },
    });
  } catch (err) {
    res.status(500).json({
      code: "GET_USER_ERROR",
      message: "Error retrieving user information",
      details: err,
    });
  }
});

/**
 * PUT: Update User Information
 *
 * @description Updates the user's information based on the email stored in the session. The route is protected by
 * the `authenticationMiddleware`, which ensures that only authenticated users can access it. If the update is
 * successful, it responds with the updated user information.
 *
 * @route PUT /
 * @access Protected (requires authentication)
 * @returns {Object} A JSON object with a code and message indicating the result of the update process.
 */
router.put("/", authenticationMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const query = {
      name: "update-user-by-email",
      text: 'UPDATE users SET "firstName" = $1, "lastName" = $2 WHERE "email" = $3;',
      values: [firstName, lastName, req.session.username],
    };

    const results = await pool.query(query);

    if ((results?.rowCount ?? 0) === 0) {
      res.status(400).json({
        code: "UPDATE_USER_ERROR",
        message: "Error updating user information",
        details: "User not found or no changes made",
      });
      return;
    }

    res.status(200).json({
      code: "UPDATE_USER_SUCCESS",
      message: "Successfully updated user information",
      details: {
        firstName,
        lastName,
        email,
      },
    });
  } catch (err) {
    res.status(500).json({
      code: "UPDATE_USER_ERROR",
      message: "Error updating user information",
      details: err,
    });
  }
});

export default router;
