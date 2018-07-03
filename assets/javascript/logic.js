$( document ).ready(function() {

    var movies = ["Star Wars", "Jurassic Park", "Lord of the Rings", "Robin Hood", "Monty Python", "Castaway", "Gone with the Wind", "Casino Royale", "Ghostbusters", "Saving Private Ryan","Remember the Titans", "The Jungle Book", "From Russia with Love"];

     renderButtons()
    //function for rendering the buttons in the array
    function renderButtons() {
      $('#gifButtons').empty();
    for (i=0; i < movies.length; i++){

    var name = movies[i]
    var genButton = $('<button class="btn btn-danger" id="movie-button">' + name + '</button>').val(name);
    $('#gifButtons').append(genButton);

  }
}

	$("#addGif").on("click", function() {
		var entered = $("#movie-input").val().trim();
		if (entered == ""){
			return false;//no blank buttons
		}
		movies.push(entered);
    console.log(movies)
		renderButtons();
		return false;
		});

//function to remove last button created
	$("removeGif").on("click", function() {
		movies.pop(entered);
		renderButtons();
		return false;
	});
$(document).on("click","img", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});


      $(document).on("click", "#movie-button", function() {
        $("#gif-div").html("")
        var movie = $(this).attr('value');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        movie + "&api_key=dc6zaTOxFJmzC&limit=10"; 
        console.log("click")
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
            console.log(results)
            for (var i = 0; i < results.length; i++) {
                //loop over all results and displaying pg and g rated gifs
              if (results[i].rating !== "r") {
                // Creating a div in storage for use in displaying gifs
                var newDiv = $("<div class='item'>");
  
                // Storing the result item's rating
                var rating = results[i].rating;
  
                // temporary p and img  
                var p = $("<p>").text("Rating: " + rating);
  
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-state", "still");
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                // Appending the newDiv with the img and rating
                newDiv.append(gifImage);
                newDiv.append(p);

  
                // appending the newDiv to the div already on the html.
                $("#gif-div").append(newDiv);
              }
            }
          });
        });
    });