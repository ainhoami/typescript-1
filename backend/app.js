const createError = require("http-errors")
const express = require ('express')
const app=express()
const userRouter = require("./routes/routes") // for dep
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//we access to all the routes in that file ./routes/routes
app.use("/api/", userRouter) 

app.use(function(req, res, next) {
    next(createError(404));
});
  

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    console.log(err)
    res.status(err.status || 500);
    res.json({
        status: err.status,
        error: err
    });
});

app.listen(8080, ()=>{
    console.log("listening on port 8080")
})

