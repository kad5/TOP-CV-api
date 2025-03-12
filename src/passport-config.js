const queries = require("./queries");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
//opts.issuer = "accounts.examplesoft.com";
//opts.audience = "yoursite.net";

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await queries.getUserById(payload.id);
      if (!user) return done(null, false);
      return done(null, user); // Attach user to `req.user`
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = { passport };
