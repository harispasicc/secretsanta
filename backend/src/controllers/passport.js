import passport from "passport";
import passportJWT from "passport-jwt";
import config from "../config/config";
const JWTStrategy = passportJWT.Strategy;

const secret = config.secret;

const cookieExtractor = (req) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies["jwt"];
  }

  return jwt;
};

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: secret,
    },
    (jwtPayload, done) => {
      const { expire } = jwtPayload;

      if (Date.now() > expire) {
        done("Unauthorized", false);
      }

      done(null, jwtPayload);
    }
  )
);
