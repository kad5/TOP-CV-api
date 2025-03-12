const validate = require("./validation");
const { verifyAccess } = require("./config");
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
  .get(verifyAccess, control.getAllDrafts)
  .post(verifyAccess, validate.post, control.addNewDraft)
  .put(verifyAccess, validate.update, control.updateDraft)
  .delete(verifyAccess, control.deleteDraft);

module.exports = router;
