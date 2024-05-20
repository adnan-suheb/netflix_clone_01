let cl = console.log;


const baseUrl = `https://api.themoviedb.org/3`;
const apiKey = `dc60cea0489db260fd29dcad7b216902`;
const imgUrl = `https://image.tmdb.org/t/p`;
const trendingMovieUrl = `${baseUrl}/trending/all/week?api_key=${apiKey}`;


const makeapiCall = async (apiUrl, methodName, msgBody) => {
    msgBody = msgBody ? JSON.stringify(msgBody) : null;
    let res = await fetch(apiUrl, {
        method: methodName,
        body: msgBody
    })
    return res.json();
}