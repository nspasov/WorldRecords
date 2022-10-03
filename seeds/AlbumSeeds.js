if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const mongoose = require('mongoose');
const connectDb = require('../db-connect');
const Artist = require('../models/ArtistModel');
const Album = require('../models/AlbumModel');
const log = require('npmlog');

connectDb(process.env.MONGO_PORT);

const seedAlbums = async() => {

    await Album.deleteMany({});

    let pinkFloydId;
    let stevenWilsonId;
    let milesDavisId;
    let kidCudiId;

    try{

        const pinkFloyd = await Artist.findOne({name: 'Pink Floyd'});
        const stevenWilson = await Artist.findOne({name: 'Steven Wilson'});
        const milesDavis = await Artist.findOne({name: 'Miles Davis'});
        const kidCudi = await Artist.findOne({name: 'Kid Cudi'});

        pinkFloydId = pinkFloyd._id;
        stevenWilsonId = stevenWilson._id;
        milesDavisId = milesDavis._id;
        kidCudiId = kidCudi._id;

        const darkSide = new Album({
            name : 'The Dark Side Of The Moon',
            artist: pinkFloydId,
            coverPhoto: 'https://i.scdn.co/image/ab67616d0000b273ea7caaff71dea1051d49b2fe',
            genre: 'rock',
            releaseYear: 1973,
            reviews: [],
            youTubeLink: 'https://www.youtube.com/embed/hsr4PmeEocE',
            reviewScore: 5,
            uploader: '6300cbd3dccfdad82a1812fe'   // Replace with existing UserID
        });
    
        const theWall = new Album({
    
            name: 'The Wall',
            artist: pinkFloydId,
            coverPhoto: 'https://i.scdn.co/image/ab67706c0000bebb6ef426535c353fb59d78b68e',
            genre: 'rock',
            releaseYear: 1979,
            reviews: [],
            youTubeLink: 'https://www.youtube.com/embed/r48BLz42NuI',
            reviewScore: 5,
            uploader: '6300cbd3dccfdad82a1812fe'   // Replace with existing UserID
    
        });
    
        const animals = new Album({
    
            name: 'Animals',
            artist: pinkFloydId,
            coverPhoto: 'https://i.scdn.co/image/ab67616d0000b273810168d54f85d48f07389237',
            genre: 'rock',
            releaseYear: 1977,
            reviews: [],
            youTubeLink: 'https://www.youtube.com/embed/D4KQae9oMWs',
            reviewScore: 5,
            uploader: '6300cbd3dccfdad82a1812fe'   // Replace with existing UserID
    
        });
    
        const hca = new Album({
            
            name: 'Hand Cannot Erase',
            artist: stevenWilsonId,
            coverPhoto: 'https://i.scdn.co/image/ab67616d0000b27359fee416d114b30583afef48',
            genre: 'rock',
            releaseYear: 2015,
            reviews: [],
            youTubeLink: 'https://www.youtube.com/embed/pGDxsQohs1w',
            reviewScore: 5,
            uploader: '6300cbd3dccfdad82a1812fe'   // Replace with existing UserID
    
        });
    
        const trtrts = new Album({
    
            name: 'The Raven That Refused To Sing',
            artist: stevenWilsonId,
            coverPhoto: 'https://i.scdn.co/image/ab67616d0000b273957ae146a564181e7bbbfbd2',
            genre: 'rock',
            releaseYear: 2013,
            reviews: [],
            youTubeLink: 'https://www.youtube.com/embed/njhyXl88k14',
            reviewScore: 5,
            uploader: '6300cbd3dccfdad82a1812fe'   // Replace with existing UserID
    
        });

        const kindOfBlue = new Album({
            name : 'Kind Of Blue',
            artist: milesDavisId,
            coverPhoto: 'https://i.scdn.co/image/ab67616d0000b2737ab89c25093ea3787b1995b4',
            genre: 'jazz',
            releaseYear: 1959,
            reviews: [],
            youTubeLink: 'https://www.youtube.com/embed/9B7ZWDaKECI',
            reviewScore: 5,
            uploader: '6300cbd3dccfdad82a1812fe'   // Replace with existing UserID
        });

        const motm = new Album({
            name : 'Man on the Moon: The End of Day',
            artist: kidCudiId,
            coverPhoto: 'https://i.scdn.co/image/ab67616d00001e02a487deeecb334b6619489d74',
            genre: 'hip-hop',
            releaseYear: 2009,
            reviews: [],
            youTubeLink: '',
            reviewScore: 5,
            uploader: '6300cbd3dccfdad82a1812fe'   // Replace with existing UserID
        });

        const motm2 = new Album({
            name : 'Man On The Moon II: The Legend Of Mr. Rager',
            artist: kidCudiId,
            coverPhoto: 'https://i.scdn.co/image/ab67616d00001e0259e842b6a3566a141f27f815',
            genre: 'hip-hop',
            releaseYear: 2010,
            reviews: [],
            youTubeLink: '',
            reviewScore: 5,
            uploader: '6300cbd3dccfdad82a1812fe'   // Replace with existing UserID
        });
               
        await darkSide.save();
        await theWall.save();
        await animals.save();
        await hca.save();
        await trtrts.save();
        await kindOfBlue.save();
        await motm.save();
        await motm2.save();

        pinkFloyd.albums.push(darkSide._id, theWall._id, animals._id);
        stevenWilson.albums.push(hca._id, trtrts._id);
        milesDavis.albums.push(kindOfBlue._id);
        kidCudi.albums.push(motm._id, motm2._id);

        await pinkFloyd.save();
        await stevenWilson.save();
        await milesDavis.save();
        await kidCudi.save();

        log.info('Albums', 'Seeded');

    } catch(err){
        log.error('Artist IDs Error', err);
    }

}


seedAlbums().then(() => mongoose.connection.close());
