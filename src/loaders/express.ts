import express from 'express';
import cors from 'cors';
import routes from '../api';
import config from '../config'
import mongoose from 'mongoose';


const expressLoader = ({app}: {app: express.Application}) => {
  app.use(express.json({limit: '6mb'}));

  // mongoose.connect(process.env.MONGODB_URI,{ useUnifiedTopology: true });

  // const db = mongoose.connection;


  // db.once('open', () => {
  //   console.log('Connected to MongoDB Atlas');
  // });
  
  // db.on('error', (error) => {
  //   console.error('Error connecting to MongoDB Atlas:', error);
  // });

  app.use(
    cors({
      origin: config.cors.origin,
      optionsSuccessStatus: 200,
    })
  );
  app.use('/', routes());
};

export default expressLoader;
