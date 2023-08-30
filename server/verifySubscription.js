import User from "./models/User.js";

import { createError } from "./error.js";

export const verifySubscription = async (req, res, next) => {
  const userToSubscribeFlag = await User.findOne({
    subscribedUsers: { $in: [req.params.id] },
  });

  if (userToSubscribeFlag) {
    return next(createError(400, "You already subscribed to this channel"));
  } else {
    next();
  }
};
