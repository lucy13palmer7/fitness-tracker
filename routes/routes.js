const router = require("express").Router()
const Workout = require("../models/workout.js")
const path = require("path")

// html routes
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public/index.html'))
})
router.get("/exercise", function (req, res){
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
 })
router.get('/stats', function(req, res){
    res.sendFile(path.join(__dirname, "../public/stats.html"))
})

router.get('/api/workouts', (req, res) => {
    Workout.find({})
    .then(workout => {
        res.json(workout)
    }).catch(err => {res.status(404).json(err)})
})
router.get('/api/workouts/range', (req, res) => {
    Workout.find({}).sort({ date: -1 })
    .then(workout => {
        res.json(workout)
    }).catch(err => {res.status(404).json(err)})
})

router.put('/api/workouts/:id', (req, res) => {
    let id = req.params.id
    let body = req.body
    let workout = {};

    Workout.findByIdAndUpdate(id, {$push:{ exercises:body }}, 
        (err) => {
        if(err){res.json({
            workout, success: false, msg: "Database Update Failure"
        })}else{
            res.json({
                workout, success: true, msg: "Database Update Success"
            })}
    })
})

router.post('/api/workouts', ({ body }, res) => {
    Workout.create(body).then(workout => {
        res.json(workout)
    }).catch(err => {
        res.status(404).json(err)
    })
})

module.exports = router