import express from "express";
import bodyParser from "body-parser";
import mongoose, { Mongoose } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js"
import generalRoutes from "./routes/general.js"
import managementRoutes from "./routes/management.js" 
import salesRoutes from "./routes/sales.js"
//Data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import { dataUser , dataProduct , dataProductStat , dataTransaction  , dataOverallStat , dataAffiliateStat} from "./data/index.js"
 
/*configuration */
dotenv.config(); //C'est une fonction de dotenv qui charge effectivement les variables d'environnement du fichier .env dans l'objet process.env.
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"})); // Always consider the specific security requirements of your application and adjust the headers accordingly
app.use(morgan("common")); // C'est une bibliothèque middleware pour la journalisation (logging) dans les applications Node.js. Elle permet de générer des logs (journaux) des requêtes HTTP effectuées sur le serveur
app.use(bodyParser.json()); //analyse le corps des requêtes HTTP au format JSON. 
app.use(bodyParser.urlencoded({extended : false})); // encodées en format URL-encoded.{extended: false} :les objets décodés seront de type String ou Array
app.use(cors()); // Utilise la fonction cors pour activer la gestion des en-têtes CORS dans les réponses du serveur. CORS est un mécanisme de sécurité côté client qui permet à des ressources web d'être demandées depuis un domaine différent de celui où la page a été chargée.


/*ROUTES*/
app.use("/client" , clientRoutes)
app.use("/general" , generalRoutes) 
app.use("/management" , managementRoutes)
app.use("/sales" , salesRoutes)

/*MONGOOSE SET UP*/
const PORT = process.env.PORT || 9000 ; // 9000 : buckup port 
mongoose.connect (process.env.MONGO_URL , {
    useNewUrlParser : true ,
    useUnifiedTopology : true ,
}).then (() => {
    app.listen(PORT , () => console .log(`Server Port : ${PORT}`))

    /* ONLY Add User Data ONE TIME */
   // AffiliateStat.insertMany(dataAffiliateStat)
    //Product.insertMany(dataProduct);
   // OverallStat.insertMany(dataOverallStat)
    //ProductStat.insertMany(dataProductStat);
    //Transaction.insertMany(dataTransaction)
  //  User.insertMany(dataUser);
}).catch ((error) => console.log(`${error} did not connect !`))