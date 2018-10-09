const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://mentorkoding:mentork0ding@ds159110.mlab.com:59110/mentor-koding-users",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected | User service"))
  .catch(err => console.log(err));
