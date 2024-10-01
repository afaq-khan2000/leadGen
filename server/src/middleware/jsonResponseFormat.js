
// Response will be sent always in the following format
exports.jsonResponseFormat = function (req, res, next) {
    // if the response in the form of success
    res.successResponse = function (notify = false, data = null, message = "", code = 200) {
      return res.status(code).json({ code, data, message, notify });
    };
  
    // if the response in the form of error
    res.errorResponse = function (notify = false, message = "Server Error", code = 500) {
      return res.status(code).json({ code, message, notify });
    };
  
    // this is default case
    next();
  };