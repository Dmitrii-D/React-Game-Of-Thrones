export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
            throw new Error (`Could not fetch ${url}, status ${res.status}`);
        }
   
        return await res.json();
    };

    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }



    getAllBooks = async () => {
        const resBooks = await this.getResource(`/books/`);
        return resBooks.map(this._transformBook);
    }

    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }


    
    getAllHouses = async () => {
        const resHouses = await this.getResource(`/houses/`);
        return resHouses.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }


    _transformCharacter = (char) => {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
            id: char.url.replace(/https:\/\/www.anapioficeandfire.com\/api\/characters\//,"")
        }
    }

    _transformHouse = (house) => {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overload: house.overload,
            ancestralWeapons: house.ancestralWeapons,
            id: house.url.replace(/https:\/\/www.anapioficeandfire.com\/api\/houses\//,"")
        }
    }

    
    _transformBook = (book) => {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released,
            id: book.url.replace(/https:\/\/www.anapioficeandfire.com\/api\/books\//,"")
        }
    }

}