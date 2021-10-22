module.exports = ({ PORT, HOST }, app) => app.listen(PORT, HOST, (err) => {
  if (err) throw err;
  console.log("Server is running on port %s:%s", HOST, PORT);
})