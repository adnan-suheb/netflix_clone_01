


const trendingMovies = document.getElementById("trendingMovies");


const initSlider = () => {
    $('#trendingMovies').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
}
// initSlider(); calling slider after getting all items in fetchTrendingMovies


const fetchTrendingMovies = async () => {
    try {
        let res = await makeapiCall(trendingMovieUrl, "get");
        cl(res)
        insertMainSliderItems(res.results);
        initSlider();
    }
    catch (err) {
        cl(err)
    }
}
fetchTrendingMovies();

const insertMainSliderItems = (arrOfMovies) => {
    trendingMovies.innerHTML = arrOfMovies.map(movie => {
        return `<div class="item">
        <figure class="mb-0 movieCard" id="trendingMovies">
            <img src="${imgUrl}/original/${movie.backdrop_path||movie.poster_path}" alt="">
            <figcaption>
                <h3 class="display-3">${movie.title || movie.original_title || movie.original_name}</h3>
                <em class="my-4">
                    ${movie.overview}
                </em>
                <button onclick="loadQparams(this)" data-id="${movie.id}" class="btn btn-large btn-red">View More</button>
                
            </figcaption>
        </figure>
    </div>`
    }).join("")
}

const loadQparams = (ele)=>{
    // let id = ele.getAttribute("data-id");
    let id = ele.dataset["id"];
    cl(id);
    let currentUrl = new URL(window.location.href);
    cl(currentUrl);

    let queryParams = new URLSearchParams(currentUrl.search);
    queryParams.set("movieId",id);
    currentUrl.search = queryParams.toString();
    let movieRedirectUrl = `${currentUrl.origin}/movieInfo.html${currentUrl.search}`;
    window.location.href = movieRedirectUrl;
}