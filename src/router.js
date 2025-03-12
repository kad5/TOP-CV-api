const validate = require("./validation");
const authorize = require("./config");
const control = require("./controller");
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
  .get(authorize.verifyAccess, control.getAllDrafts)
  .post(authorize.verifyAccess, validate.signup, control.addNewDraft)
  .put(authorize.verifyAccess, validate.signup, control.updateDrafts)
  .delete(authorize.verifyAccess, control.deleteDraft);

module.exports = router;
