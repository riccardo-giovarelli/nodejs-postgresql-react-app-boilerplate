import express from "express";

import { authenticationMiddleware } from "../users.lib.ts";

const router = express.Router();

const SESSION_COOKIE_NAME = "app-boilerplate-session";

/**
 * GET: Logout
 *
 * @description Handles the logout process by destroying the user's session and clearing the session cookie.
 * If the session is successfully destroyed, it responds with a success message. If there is an error during
 * the session destruction, it responds with an error message.
 *
 * @route GET /
 * @access Protected (requires authentication)
 * @returns {Object} A JSON object with a code and message indicating the result of the logout process.
 */
router.post("/", authenticationMiddleware, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ code: "LOGOUT_ERROR", message: "Error while logging out", details: err });
      return;
    }

    res.clearCookie(SESSION_COOKIE_NAME);

    res.status(200).json({ code: "LOGGED_OUT", message: "User logged out", details: "Current user logged out" });
  });
});

export default router;
