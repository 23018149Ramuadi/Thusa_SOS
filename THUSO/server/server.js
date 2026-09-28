require('dotenv').config();
const 
  path=require('path');
const
  express=require('express');
const
  helmet=require('helmet');
const
  cors=require('cors');
const
  morgan=require('morgan');
const
  connectDB=require('./config/database');
const 
  errors=require('./middleware/errors');
if(!process.env.MONGODB_URI||!process.env.JWT_SECRET){
  console.error('Missing MONGODB_URI or JWT_SECRET. Copy .env.example to .env.');
  process
    .exit(1);
}
const
  app=express();
app.set('trust proxy',1);
app.use(helmet({contentSecurityPolicy:false}));
const
  origins=(process.env.CLIENT_ORIGIN||'http://localhost:5000').split(',').map(x=>x.trim().replace(/\/$/,''));
app.use(cors({origin:(origin,cb)=>!origin||origins
  .includes(origin.replace(/\/$/,''))?
  cb(null,true):cb(new Error('Origin not allowed by CORS'))}));
app.use(express.json({limit:'50kb'}));
app.use(morgan('dev'));
app.get('/api/health',
        (req,res)=>res.json({ok:true,service:'SafeHer API'}));
app.use('/api/auth',
        require('./routes/auth'));
app.use('/api/contacts',
        require('./routes/contacts'));
app.use('/api/sos',
        require('./routes/sos'));
app.use('/api/profile',
        require('./routes/profile'));
app.use(express
        .static(path.join(__dirname,'../client')));
app.get('/',(req,res)=>res
  .sendFile(path.join(__dirname,'../client/index.html')));
app.use(errors);
connectDB().then(()=>app.listen(process.env.PORT||5000,
                                ()=>console.log(`SafeHer running on port ${process.env.PORT||5000}`))).
  catch(e=>{
    console.error('Database connection failed:',e.message);
                                                                                                                                        process.exit(1);});
