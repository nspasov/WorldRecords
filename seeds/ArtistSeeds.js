if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const mongoose = require('mongoose');
const connectDb = require('../db-connect');
const Artist = require('../models/ArtistModel');
const log = require('npmlog');

connectDb(process.env.MONGO_PORT);

const seedArtists = async() => {
    await Artist.deleteMany({});

    const pinkFloyd = new Artist({
        name: 'Pink Floyd',
        photo: 'https://media.metacast.eu/pictures/06_2022/pq6kwtIMBOvuS3PeD5RN-78026.png',
        description: `Pink Floyd are one of the most successful and influential rock groups in history.
        The members of the group to become known as Pink Floyd came together in London, but the band’s roots were in Cambridge, 
        in the East of England, in the early 1960s.`,
        albums: [],
        uploader: '6300cbd3dccfdad82a1812fe'   // Replace with existing UserID

    });

    const stevenWilson = new Artist({
        name: 'Steven Wilson',
        photo: 'https://static.timesofisrael.com/www/uploads/2018/10/steven-wilson-credit-Hajo-Mueller-1024x640.jpg',
        description: 'Steven Wilson is an English musician and record producer. Currently a solo artist, he became known as the founder, lead guitarist, singer, and songwriter of the band Porcupine Tree, as well as being a member of several other bands.',
        albums: [],
        uploader: '6300cbd3dccfdad82a1812fe'   // Replace with existing UserID
    });

    const milesDavis = new Artist({
        name: 'Miles Davis',
        photo: 'https://johnnyaylward.files.wordpress.com/2020/10/miles-davis-birth-of-the-cool-3-credit-herman-leonard-photography-llc-1000.jpg',
        description: 'A monumental innovator, icon, and maverick, trumpeter Miles Davis helped define the course of jazz as well as popular culture in the 20th century, bridging the gap between bebop, modal music, funk, and fusion. Throughout most of his 50-year career, Davis played the trumpet in a lyrical, introspective style, often employing a stemless Harmon mute to make his sound more personal and intimate.',
        albums: [],
        uploader: '6300cbd3dccfdad82a1812fe'
    });

    const kidCudi = new Artist({
        name: 'Kid Cudi',
        photo: 'https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F220819082451-kid-cudi-0502-restricted.jpg',
        description: 'Kid Cudi is a Brooklyn-based rapper from Cleveland whose personal lyrical angles and innovative perspectives on production and genre combination made him one of the more influential talents of his time.',
        albums: [],
        uploader: '6300cbd3dccfdad82a1812fe'
    });

    
    await pinkFloyd.save();
    await stevenWilson.save();
    await milesDavis.save();
    await kidCudi.save();

    log.info('Artists', 'Seeded');

}

seedArtists().then(() => mongoose.connection.close());