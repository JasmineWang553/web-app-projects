const mongoose = require("mongoose")
const Campground = require("../models/campground")

const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers")

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

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://placeimg.com/640/480/any",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, minima quae ut molestiae rem dignissimos beatae unde aliquid commodi illo, quidem eum necessitatibus ipsa reprehenderit odit vitae nemo corporis ducimus?",
            price: price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})