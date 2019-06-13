var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");
var data = [
    {
        name: "Camping en la nieve", 
        image: "https://s-ec.bstatic.com/xdata/images/hotel/max500/180950892.jpg?k=a9dc502ce45d4c9d2452c3da0d244208fb2663a5e1b0a89f46ff49117ab62926&o=",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."        
    },
    {
        name: "En el Rio", 
        image: "https://i1.wp.com/glacierguides.com/wp-content/uploads/2016/04/922276_10152799573260204_793036704_o-e1462232188116.jpg?ssl=1",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."        
    },
    {
        name: "Machu Pichu", 
        image: "http://www.tipiquebec.com/images/tipis/prive-7.9.07-4_redimensionner.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."        
    }
]

function seedDB(){
        //Remove all campgrounds
        Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Campgrounds removed!");
        }
        //Add a few Campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err,  campground){
                if(err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //Create a comment
                    Comment.create(
                        {
                            text: "Este lugar es genial, pero prefiero quedarme viciando al counter",
                            author: "Martin Coscu" 
                        }, function(err, comment){
                            if(err) {
                                console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created a new comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;