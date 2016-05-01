/**
 * Created by Karen on 01-05-2016.
 */
//Create test categories
var mongoose = require('mongoose'),
    Category = require('../server/category/category.model'),
    Price = require('../server/product/price.model'),
    Product = require('../server/product/product.model'),
    ProductFlag = require('../server/productflag/product.flag.model'),
    dbname = "staudestedet";


var categoryData = {
    categories : [
        {
            categoryId: "1",
            parentCatId: "0",
            name: "A",
            description: "Stauder, hvor det botaniske navn begynder med A.",
            image: "kategori_a.jpg",
            sortOrder: 1
        },
        {
            categoryId: "2",
            parentCatId: "1",
            name: "Achillea",
            description: "Achillea'erne/røllikerne herunder er alle af en type, der ynder veldrænet vokseplads til den tørre side. Achillea/røllike findes i et utal af farver og er rigtig gode til afskæring. Achillea'erne/røllikerne kan med fordel skæres tilbage efter blomstring for at blomstre igen. og bør deles hvert andet/tredje år for at trives. Nogle achilleaer/rølliker kan være kortlivede.",
            image: "kategori_achillea.jpg",
            sortOrder: 1
        },
        {
            categoryId: "3",
            parentCatId: "1",
            name: "Actaea",
            description: "Actaea/sølvlys er en forholdsvis sent blomstrende staude med en helt fantastisk duft. Actaea/sølvlys trives rigtig godt i Sol / halvskygge / vandrende skygge i en god og ikke for tør havejord. For at holde på fugten kan der med fordel fordeles noget kompost rundt om planten.",
            image: "kategori_actaea.jpg",
            sortOrder: 2
        },
        {
            categoryId: "4",
            parentCatId: "0",
            name: "B",
            description: "Stauder hvor det botaniske navn starter med B.",
            image: "kategori_b.jpg",
            sortOrder: 2
        },
        {
            categoryId: "5",
            parentCatId: "0",
            name: "Nyheder 2016",
            description: "Nye stauder sæson 2016, sendes fra 1. april",
            image: "kategori_nyheder2016.jpg",
            sortOrder: 3
        }

    ]
};

var standardPrice25 = new Price({
    price: 25,
    currency: "Kroner",
    type: "Normalpris"
});

var standardPrice30 = new Price({
    price: 25,
    currency: "Kroner",
    type: "Normalpris"
});

var AchilleaCoronationGold = new Product({
    productId: 1,
    name: "Achillea 'Coronation Gold' - Røllike",
    shortDescription: "God og robust staude til staudebedet og supergod blandt græsser.",
    longDescription: "Gul. 70-80 cm. Juni - august. Sol. Alm. veldrænet havejord. Tørketålende. God og robust staude til staudebedet og supergod blandt græsser. Rølliken er også supergod snitblomst.",
    categories: ["Achillea"],
    image: "achillea-coronation-gold.jpg",
    state: "Aktiv"
});

var AchilleaMillefoliumSunnySeduction = new Product({
    productId: 2,
    name: "Achillea Millefolium 'Sunny Seduction' - Røllike",
    shortDescription: "Flot Achillea i den fineste lysegule farve",
    longDescription: "Lysegul. 80 cm. Juni - August. Sol. Alm. veldrænet havejord.",
    categories: ["Achillea"],
    productFlags: ["Nyhed"],
    image: "achillea-millefolium-sunny-seduction.jpg",
    state: "Aktiv"
});

var AchilleaPtarmicaThePearl = new Product({
    productId: 3,
    name: "Achillea Ptarmica 'The Pearl' - Nyserøllike",
    shortDescription: "Flot nyserøllike med dobbelte hvide blomster",
    longDescription: "Hvid m. dobbelt blomst. 50-60 cm. Juni - august. Sol. Alm. havejord. Hvid nyserøllike med dobbelte blomster, der producerer et væld af blomster. En stauder der også er rigtig god til buketter.",
    categories: ["Achillea"],
    image: "achillea-ptarmica-the-pearl.jpg",
    state: "Aktiv"
});

var AchilleaSafran = new Product({
    productId: 4,
    name: "Achillea 'Safran' - Røllike",
    shortDescription: "Flot rød Achillea",
    longDescription: "Flot rød Achillea, der passer i et flot efterårsbed",
    categories: ["Achillea"],
    image: "achillea-safran.jpg",
    state: "Aktiv"
});
AchilleaCoronationGold.prices.push(standardPrice25);
AchilleaMillefoliumSunnySeduction.prices.push(standardPrice30);
AchilleaPtarmicaThePearl.prices.push(standardPrice30);
AchilleaSafran.prices.push(standardPrice25);

var ActaeaRacemosaBlackNegligee = new Product({
    productId: 5,
    name: "Actaea racemosa 'BlackNegligee' - Sølvlys",
    shortDescription: "Flot sølvlys med hvide blomster og mørkt løv",
    longDescription: "Hvid med mørkebrunt løv. 70-80 cm. August - september. Sol - halvskygge. Alm. fugtighedsbevarende havejord. Alle sølvlysene har en helt fantastisk duft, når de blomstrer. En staude der også er rigtig god og dekorativ i krukker.",
    categories: ["Actaea"],
    image: "actaea-racemosa-black-negligee.jpg",
    state: "Aktiv"
});

var ActaeaRacemosaChocoholic = new Product({
    productId: 6,
    name: "Actaea racemosa 'Chocoholic' - Sølvlys",
    shortDescription: "Flot sølvlys med sart rosa blomster og mørkt løv",
    longDescription: "Sart rosa med mørkebrunt løv. 70-80 cm. August - september. Sol - halvskygge. Alm. fugtighedsbevarende havejord. Alle sølvlysene har en helt fantastisk duft, når de blomstrer. En staude der også er rigtig god og dekorativ i krukker.",
    categories: ["Actaea"],
    image: "actaea-racemosa-chocoholic.jpg",
    state: "Aktiv"
});

var ActaeaSimplexWhitePearl = new Product({
    productId: 7,
    name: "Actaea simplex 'White Pearl' - Sølvlys",
    shortDescription: "Traditionel sølvlys med hvide blomster",
    longDescription: "Hvid med grønt løv. 70-80 cm. August - september. Sol - halvskygge. Alm. fugtighedsbevarende havejord. Alle sølvlysene har en helt fantastisk duft, når de blomstrer. En staude der også er rigtig god og dekorativ i krukker.",
    categories: ["Actaea"],
    image: "actaea-simplex-white-pearl.jpg",
    state: "Aktiv"
});

ActaeaRacemosaBlackNegligee.prices.push(standardPrice30);
ActaeaRacemosaChocoholic.prices.push(standardPrice30);
ActaeaSimplexWhitePearl.prices.push(standardPrice30);


var BallotaPseudodictamnus = new Product({
    productId: 8,
    name: "Ballota pseudodictamnus",
    shortDescription: "Attraktiv med låddent gråt løv og lilla blomster",
    longDescription: "Lilla med gråt låddent løv. 50 cm. Juli - august. Sol. Tør, varm og veldrænet havejord. Jeg er faldet for det grålige løv på denne plante, men den kræver en meget varm og veldrænet vokseplads for at kunne trives her.",
    categories: ["B"],
    productFlags: ["Nyhed"],
    image: "ballota-pseudodictamnus.jpg",
    state: "Aktiv"
});

var BaptisiaDecadenceDutchChocolate = new Product({
    productId: 9,
    name: "Baptisia 'Decadence Dutch Chocolate' - Farvebælg",
    shortDescription: "Farvebælg i den flotteste mørke purpur/brune farve",
    longDescription: "Mørk purpur/brun. 70-80 cm. Juni - august. Sol. Alm. havejord.",
    categories: ["B"],
    productFlags: ["Nyhed"],
    image: "baptisia-decadence-dutch-chocolate.jpg",
    state: "Aktiv"
});

var BergeniaAbendglut = new Product({
    productId: 10,
    name: "Bergenia 'Abendglut' - Kæmpestenbræk",
    shortDescription: "Traditionel kæmpestenbræk med pink blomster",
    longDescription: "Pink. 30 - 40 cm. April - maj. Sol - halvskygge. Alm. havejord.",
    categories: ["B"],
    image: "bergenia-abendglut.jpg",
    state: "Aktiv"
});

BallotaPseudodictamnus.prices.push(standardPrice30);
BaptisiaDecadenceDutchChocolate.prices.push(standardPrice30);
BergeniaAbendglut.prices.push(standardPrice30);

var productData = {
    products : [
        AchilleaCoronationGold,
        AchilleaMillefoliumSunnySeduction,
        AchilleaPtarmicaThePearl,
        AchilleaSafran,
        ActaeaRacemosaBlackNegligee,
        ActaeaRacemosaChocoholic,
        ActaeaSimplexWhitePearl,
        BallotaPseudodictamnus,
        BaptisiaDecadenceDutchChocolate,
        BergeniaAbendglut]};

var productFlagData = {
    productFlags : [
        {
            productFlagId: 1,
            name: "Nyhed",
            image: "news_flag.jpg"
        },
        {
            productFlagId: 2,
            name: "Sale",
            image: "sale_flag.jpg"
        },
        {
            productFlagId: 3,
            name: "BestBuy",
            image: "bestBuy_flag.jpg"
        }
    ]
};

//Connect to database
mongoose.connect("mongodb://localhost/" + dbname);

//Delete existing categories and create new
var db = mongoose.connection;
db.on("error", console.error);
db.once("open", deleteData);

function deleteData() {
    Category.remove({}, function (err) {
        if (err) console.log(err);
        Product.remove({}, function (err) {
            if (err) console.log(err);
            ProductFlag.remove({}, function (err) {
                if (err) console.log(err);
                insertData();
            })
        })
    })
}

function insertData(){
    console.info('Adding product flags to staudestedet db');
    ProductFlag.create(productFlagData.productFlags, function(error){
        if(error) console.error('Error: ' + error);
    });
    console.info('Done adding product flags to staudestedet db');
    console.info('Adding categories to staudestedet db');
    Category.create(categoryData.categories, function(error){
        if(error) console.error('Error: ' + error);
    });
    console.info('Done adding categories to staudestedet db');
    console.info('Adding products to staudestedet db');
    Product.create(productData.products, function(error){
        if(error) console.error('Error: ' + error);
    });
    console.info('Done adding categories to staudestedet db');

}