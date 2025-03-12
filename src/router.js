const validate = require("./validation");
const control = require("./controller");
const { passport } = require("./passport-config");
const { Router } = require("express");
const router = Router();

//auth
router.post("/auth/sign-up", validate.signup, control.signup);
router.post("/auth/log-in", control.login);
router.post("/auth/log-out", control.logout);
router.post("/auth/refresh", control.refreshToken);

//user
//change password?

//crud
router
  .route("/drafts")
  .get(passport.authenticate("jwt", { session: false }), control.getAllDrafts)
  .post(
    passport.authenticate("jwt", { session: false }),
    validate.post,
    control.addNewDraft
  )
  .put(
    passport.authenticate("jwt", { session: false }),
    validate.update,
    control.updateDraft
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    control.deleteDraft
  );

module.exports = router;
