export function getCurrentYear() {
    const date = new Date();
    return date.getFullYear();
}

export function getYearInShort(year) {
    // takes year in plain number or string format - 2011 2006 etc and gives out last two digits in string
    if(!year) {
        return '';
    }
    year = parseInt(year);
    const lastTwo = year % 100;
    return parseInt(lastTwo / 10) === 0 ? `0${lastTwo}` : `${lastTwo}`;
}

/*
module.exports = {
    getCurrentYear,
    getYearInShort
}*/
