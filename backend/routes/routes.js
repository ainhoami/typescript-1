const router = require ('express').Router()
const axios = require('axios')

//grab all the users from the API call
router.get('/users', (req, res) => {
    axios.get('https://jsonplaceholder.typicode.com/users/').then(resp =>{
      
       //don´t want all the properties so the ouput is being formatted
        let data = resp.data.map(d=>({
            id: d.id,
            name:d.name,
            username: d.username,
            email: d.email,
            address: d.address.street,
            suite: d.address.suite,
            city: d.address.city,
            zipcode: d.address.zipcode,
            lat:d.address.geo.lat,
            lng:d.address.geo.lng,
            phone: d.phone,
            website: d.website,
            company: d.company.name
        }))
    
      // console.log(data, " data")
      res.json(data)

  }).catch(err =>
    console.log(err, "err getting data"))
  });


// grab the albums filtered by the user id
  router.get('/albums/:id', (req, res) => {
    const userid= req.params.id
    axios.get('https://jsonplaceholder.typicode.com/albums?userId='+userid).then(resp =>{
      res.json(resp.data)
  }).catch(err =>
    console.log(err, "err getting data"))
  });


// grab the photos filtered by the album id
  router.get('/photos/:id', (req, res) => {
    const albumid= req.params.id
    axios.get('https://jsonplaceholder.typicode.com/photos?albumId='+albumid).then(resp =>{
      res.json(resp.data)
  }).catch(err =>
    console.log(err, "err getting data"))
  });




  module.exports = router 