var express = require('express');
const { default: knex } = require('knex');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.db.from('users').select('*')
    .then((rows) => {
      res.json({"Error" : false, "Message" : "Success", "Users" : rows})
    })
    .catch((err) => {
      console.log(err);
      res.json({"Error" : true, "Message" : "Error in MySQL query"})
    })
});

router.post('/', function(req, res, next) {  
  req.db.from('users').select("*")
    .from("users")
    .where("username", req.body.username)
    .then(userNameList => {
      if (userNameList.length === 0) {
        req.db('users')
          .returning('id', 'username')
          .insert([{
            username: req.body.username
          }])
          .then((newUser) => {
            res.json({"Error" : false, "Message" : "Success", "user" : { "id": newUser[0], "username": req.body.username } })
          });
      } else {
        res.json({"Error" : false, "Message" : "Success", "user": userNameList[0]})
      }
    })
})

router.get('/:id/', function(req, res, next) {
  req.db.from('faves').select('*').where('user_id','=', req.params.id)
  .then((rows) => {
    res.json({"Error" : false, "Message" : "Success", "Favourites" : rows})
  })
  .catch((err) => {
    console.log(err);
    res.json({"Error" : true, "Messaage" : "Error in MySQL query"})
  }) 
});

router.post('/:id/', function(req, res, next) {
  req.db.from('faves').select("*").where('user_id', req.params.id)
    .then(faveList => {
      if (faveList.some(e => e.symbol == req.body.symbol)) {
        req.db('faves').where("symbol", req.body.symbol).andWhere("user_id", req.params.id)
          .del()
          .then(res.json({"Error" : false, "Message" : "Success"}))
        } else {
        req.db('faves')
          .returning("*")
          .insert([{user: req.params.id, symbol: req.body.symbol}])
          .then(res.json({"Error" : false, "Message" : "Success"}))
      }
    })
  })



module.exports = router;
