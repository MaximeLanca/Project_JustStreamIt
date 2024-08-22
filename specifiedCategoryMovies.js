function sendCriteriaForFetch() {
    let inputsDictionnary = {
        'sixBestMovies': 'sort_by=-imdb_score',
        'dramaMovies': 'sort_by=-imdb_score&genre=Drama',
        'crimeMovies': 'sort_by=-imdb_score&genre=Crime'
    };

    for (let key in inputsDictionnary) {
        fetchMovies(key, inputsDictionnary[key]);
    };
};

sendCriteriaForFetch();