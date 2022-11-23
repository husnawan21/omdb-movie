function searchMovie() {
	$("#movie-list").html("");
	$.ajax({
		url: "https://www.omdbapi.com/",
		type: "get",
		dataType: "json",
		data: {
			apikey: "de6e7412",
			s: $("#search-input").val(),
		},
		success: function (result) {
			if (result.Response == "True") {
				let movies = result.Search;
				$.each(movies, function (i, data) {
					$("#movie-list").append(`
						<div class="card card-compact w-full bg-base-100 shadow-xl shadow-primary/10">
							<figure class="relative"><img src="${data.Poster}" alt="${data.Title}" class="object-cover" /><a class="btn btn-md absolute bottom-2 right-2">${data.Year}</a></figure>
							<div class="card-body">
								<h2 class="card-title">${data.Title}</h2>
								<div class="card-actions justify-end">
									<label class="btn btn-primary see-detail" for="my-modal-5" data-id="${data.imdbID}">See Detail</label>
								</div>
							</div>
						</div>
						`);

					$("#result-message").html(
						`<h1 class="text-3xl font-bold text-center mt-8">Result for "` +
							$("#search-input").val() +
							`"</h1>`
					);
				});

				$("#search-input").val("");
			} else {
				$("#error-message").html(
					`<h1 class="text-3xl font-bold text-center mt-8">` +
						result.Error +
						`</h1>`
				);
			}
		},
	});
}

$("#search-button").on("click", function () {
	searchMovie();
});

$("#search-input").on("keyup", function (e) {
	if (e.code === "Enter") {
		searchMovie();
	}
});

$("#movie-list").on("click", ".see-detail", function () {
	$.ajax({
		url: "https://www.omdbapi.com/",
		type: "get",
		dataType: "json",
		data: {
			apikey: "de6e7412",
			i: $(this).data("id"),
		},
		success: function (movie) {
			if (movie.Response === "True") {
				$(".modal-body").html(`
				<div>
					<div class="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-5 leading-relaxed">
						<img src="${movie.Poster}" class="w-full rounded" alt="${movie.Title}">
							<div>
								<h3 class="font-bold text-xl py-3">${movie.Title}</h3>
								<ul class="bg-base-100 pt-4 pb-6 px-4 rounded-lg mb-6 shadow-md">
									<li><span class="font-bold">Year: </span>${movie.Year}</li>
									<li><span class="font-bold">Rated: </span>${movie.Rated}</li>
									<li><span class="font-bold">Released: </span>${movie.Released}</li>
									<li><span class="font-bold">Runtime: </span>${movie.Runtime}</li>
									<li><span class="font-bold">Genre: </span>${movie.Genre}</li>
									<li><span class="font-bold">Director: </span>${movie.Director}</li>
									<li><span class="font-bold">Writer: </span>${movie.Writer}</li>
									<li><span class="font-bold">Actors: </span>${movie.Actors}</li>
									<li><span class="font-bold">Plot: </span>${movie.Plot}</li>
									<li><span class="font-bold">Language: </span>${movie.Language}</li>
									<li><span class="font-bold">Country: </span>${movie.Country}</li>
								</ul>
							</div>
							<div class="modal-action relative">
								<label for="my-modal-5" class="btn absolute bottom-2 right-2 btn-circle btn-primary">✕</label>
							</div>
					</div>
								
				</div>
				`);
			}
		},
	});
});
