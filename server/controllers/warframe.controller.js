const Warframe = require("../models/warframe.model");
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const createNewWarframe = ( req,res ) => {
    const user = jwt.verify(req.cookies.userToken, SECRET);
    Warframe.create({...req.body, createdBy: user._id})
    .then( (newFrame) => { res.json({ newFrame }) })
    .catch( (err) => { res.status(400).json( {err}) });
};

const getAllWarframes = ( req,res ) => {
    Warframe.find( {} ).populate('createdBy', 'username')
    .then( (allFrames) => res.json(allFrames) )
    .catch( (err) => { res.status(400).json( {err}) });
};

const frameById = ( req,res ) => {
    Warframe.findById( req.params.id )
    .then( (frame) => {
        console.log(frame)
        res.json(frame) })
    .catch( (err) => { res.status(400).json( {err}) });
};

const editWarframe = ( req,res ) => {
    const { params } = req;
    Warframe.findByIdAndUpdate( req.params.id, req.body , {
        new: true,
        runValidators: true,
    })
    .then( (updateFrame) => res.json(updateFrame) )
    .catch( (err) => { res.status(400).json( {err}) });
};

const deleteWarframe = ( req,res ) => {
    Warframe.deleteOne( {_id:req.params.id} )
    .then( (result) => res.json(result) )
    .catch( (err) => console.log("Error Deleting Frame", err) );
};

module.exports = {
    createNewWarframe,
    getAllWarframes,
    frameById,
    editWarframe,
    deleteWarframe,
};

