// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    const directors = moviesArray.map(d => d.director)
    const uniqueDirectors = [...new Set(directors)]

    return uniqueDirectors
}
console.log(getAllDirectors(directors))

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {

    if (moviesArray.length === 0) return 0

    const filteredMovies = moviesArray.filter(movie => movie.director === 'Steven Spielberg' && movie.genre.includes('Drama'))

    return filteredMovies.length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (moviesArray.length === 0) return 0
    const totalScore = moviesArray.reduce((sum, movie) => {
        return sum + (movie.score || 0)
    }, 0)

    const avgScore = totalScore / moviesArray.length

    return Number(avgScore.toFixed(2))
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {

    const filteredDramaMovies = moviesArray.filter(d => d.genre.includes('Drama'))

    if (filteredDramaMovies.length === 0) return 0

    const totalDramaScore = filteredDramaMovies.reduce((sum, drama) => {
        return sum + (drama.score || 0)
    }, 0)

    const avgDramaScore = totalDramaScore / filteredDramaMovies.length

    return Number(avgDramaScore.toFixed(2))
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    const moviesArrayCopy = [...moviesArray]

    moviesArrayCopy.sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year
        return a.title.localeCompare(b.title)
    })

    return moviesArrayCopy
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    const moviesArrayCopy = [...moviesArray]

    const filteredByTitle = moviesArrayCopy.map(t => t.title)
    filteredByTitle.sort()

    if (filteredByTitle.length > 20) {
        return filteredByTitle.slice(0, 20)
    }
    return filteredByTitle
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {

    const moviesArrayCopy = [...moviesArray]

    const result = moviesArrayCopy.map(t => {
        const durationParts = t.duration.split(' ')

        let minutes = 0
        for (let part of durationParts) {
            if (part.includes('h')) {
                minutes += parseInt(part) * 60
            }
            if (part.includes('min')) {
                minutes += parseInt(part)
            }

        }
        return {
            ...t,
            duration: minutes
        }
    })

    return result
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) return null

    if (moviesArray.length === 1) {
        const singleMovie = moviesArray[0]
        return `The best year was ${singleMovie.year} with an average score of ${singleMovie.score.toFixed(1)}`
    }

    const moviesByYear = {}
    moviesArray.forEach(movie => {
        if (!moviesByYear[movie.year]) {
            moviesByYear[movie.year] = []
        }
        moviesByYear[movie.year].push(movie)
    })

    const avgScoresByYear = []
    for (const year in moviesByYear) {
        const avgScore = scoresAverage(moviesByYear[year])
        avgScoresByYear.push({ year: parseInt(year), averageScore: avgScore })
    }

    avgScoresByYear.sort((a, b) => b.averageScore - a.averageScore || a.year - b.year)
    const bestYear = avgScoresByYear[0]

    return `The best year was ${bestYear.year} with an average score of ${bestYear.averageScore.toFixed(1)}`
}
