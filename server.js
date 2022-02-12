const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const URL = 'fakeURL';


mongoose
  .connect(URL)
  .then(() => {
    console.log('Successfull connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 3000;
app.use(cookieParser());


app.use('/api/enquiries', enquiryRouter);
app.use('/api/people', peopleRouter);

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
