const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const Campground = require("./models/campground")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const catchAsync = require("./utils/catchAsync")
const ExpressError = require("./utils/ExpressError")
const ObjectID = require('mongoose').Types.ObjectId;
const joi = require('joi')
const { resourceLimits } = require("worker_threads")
const {campgroundSchema} = require("./schemas")

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', err => {
    logError(err);
});
db.once("open", () => {
    console.log("DB is connected");
})

const app = express()

app.engine("ejs", ejsMate)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("home")
})

// testing connection
// app.get("/makecampground", async (req, res) => {
//     const camp = new Campground({ title: "MyBackyard", description: "asdf" });
//     await camp.save();
//     res.send(camp)
// })

const validateCampground = (req, res, next) =>{
    const {error}= campgroundSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    }else{
        next()
    }
}


// SHOW ALL
app.get("/campgrounds", catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}))



// ADD NEW
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
})

app.post("/campgrounds", validateCampground, catchAsync(async(req, res, next) => {
    // try{
    //     const campground = new Campground(req.body.campground);
    //     await campground.save();
    //     res.redirect(`/campgrounds/${campground._id}`)
    // }catch (e){
    //     next(e)
    // }
    // if(!req.body.campground) throw new ExpressError("invalid campground", 400)
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

//SHOW ONE
app.get("/campgrounds/:id", catchAsync( async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return next(new ExpressError('Invalid Id', 400));
    }
    

    const campground = await Campground.findById(req.params.id)
    res.render("campgrounds/show", { campground });
}))  

// EDIT
app.get("/campgrounds/:id/edit", catchAsync( async (req, res, next) => {
    try{
        const campground = await Campground.findById(req.params.id)
        res.render("campgrounds/edit", { campground });
    }catch(e){
        next(e)
    }
}))

app.put("/campgrounds/:id", validateCampground, catchAsync( async (req, res) => {
    const id = req.params.id
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    res.redirect(`/campgrounds/${campground._id}`)
}))

// DELETE
app.delete("/campgrounds/:id", catchAsync(async(req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id)
    res.redirect("/campgrounds")

}))

app.all("*", (req, res, next) => {
    next(new ExpressError("Page not found", 404));
})

app.use((err, req, res, next) => {
    const {statusCode=500, message="something wrong"} = err;

    if(!err.message) err.message = "Oh No, Something Went Wrong!"

    res.status(statusCode).render('error', {err})
})


app.listen(3000, () => {
    console.log("serving on port 3000");
})