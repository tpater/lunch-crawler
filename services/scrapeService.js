const requestPromise = require('request-promise');
const moment = require('moment');
const cheerio = require('cheerio');

const transform = (body) => cheerio.load(body);

const sanitizeText = (text) => {
    return text.split('\n').filter((val) => Boolean(val));
};

const getAwokadoMenu = () => {
    const options = {
        uri: 'http://awokado.krakow.pl/lunch-bar/menu/',
        transform
    };

    return requestPromise(options)
        .then($ => {
            let tabContents = $('.responsive-tabs .tabcontent').toArray();
            //get rid of 1st and last element
            tabContents = tabContents.filter((el, index, arr) => index > 0 && index < arr.length - 1);
            const dow = moment().isoWeekday();
            if (dow > 5) {
                return 'No lunch menu today. Sorry!';
            }
            const text = $(tabContents[dow - 1]).text();
            return sanitizeText(text);
        })
        .catch(e => console.log(`Error calling ${options.uri}: `, e));
};

const getFreshMenu = () => {
    const options = {
        uri: 'http://www.fresh-krakow.pl/menu',
        transform
    };

    return requestPromise(options)
        .then($ => {
            let freshMenu = {};
            const soups = $('.soups')
                .parent()
                .find('ul')
                .first()
                .find('li').toArray();
            freshMenu.soups = soups.map(soup => $(soup).find('span').text());

            const mainDishes = $('.maindishes')
                .parent()
                .find('ul')
                .last()
                .find('li').toArray();
            freshMenu.mainDishes = mainDishes.map(dish => $(dish).find('span').text());
            return freshMenu;
        })
        .catch(e => console.log(`Error calling ${options.uri}: `, e));
};

const getMenus = () => {
    return Promise.all([
        getFreshMenu(),
        getAwokadoMenu()
    ]);
};

module.exports = {
    getMenus
};
