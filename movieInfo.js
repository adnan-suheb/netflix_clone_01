
// DOM seletion 
const singleMovie = document.getElementById('singleMovie');
const singleMovieContainer = document.querySelector('.singleMovieContainer figcaption')

// single Data ID >> routes Query params

const getMovieInfo = async() => {
    let currentUrl = new URL(window.location.href)
    let queryParams = new URLSearchParams(currentUrl.search)
    const movieId = queryParams.get('movieId')
    const SINGLE_MOVIE_url = `${baseUrl}/movie/${movieId}?api_key=${apiKey}`
    const CAST_CREW_url = `${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`
cl(CAST_CREW_url)

    // let movieObj = await makeAPIcall(SINGLE_MOVIE_url,'GET',null)
    // let castObj = await makeAPIcall(CAST_CREW_url,'GET',null)

    let apiArr = [
        makeapiCall(SINGLE_MOVIE_url,'GET',null),
        makeapiCall(CAST_CREW_url,'GET',null)
    ]

    let [movieObj , castObj] = await Promise.all(apiArr);
    cl(movieObj)
    cl(castObj)

    singleMovieContainer.innerHTML = `
    <div>
    <img src="https://image.tmdb.org/t/p/w342/${movieObj.production_companies[0].logo_path}" 
    alt="${movieObj.title || movieObj.original_title || movieObj.original_name}" 
    title="${movieObj.title || movieObj.original_title || movieObj.original_name}" class="movieLogo mb-4">
    <h4 class="title mb-4">${movieObj.title || movieObj.original_title || movieObj.original_name}</h4>
    <ul class="details">
        <li>${movieObj.release_date}</li>
        <li><span>
            ${movieObj.adult ? 'A' : 'U/A'}
        </span>
        </li>
        <li>${movieObj.runtime}</li>
        <li class="genresList">${movieObj.genres.map(gen =>
             `<span data-genresId="${gen.id}">${gen.name}</span>`).join(' , ')}
             </li>
    </ul>
    <p class="overView">
    ${movieObj.overview}
      </p>
    <p class="starring">
        <strong>Starring :</strong>
        ${castObj.cast.slice(0,5).map(cast => cast.name || cast.original_name).join(' , ')}
    </p>
 </div>
       `

    let bannerImg = `${imgUrl}/original${movieObj.poster_path}`;

    singleMovie.style.backgroundImage = `url(${bannerImg})`;
    
}
getMovieInfo()

