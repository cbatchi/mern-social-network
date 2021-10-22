module.exports = (mongoose = require("mongoose")) => {
  mongoose.set("strictQuery", false);
  return mongoose
    .connect(process.env.MONGOOSE_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((conn) =>
      console.log("Connected to database " + conn.connection.name)
    )
    .catch((err) => console.error(err));
};
