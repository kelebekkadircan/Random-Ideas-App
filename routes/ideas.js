const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

// İdeas






// Get all ideas
router.get('/', async (req,res) =>
{
    try {
        const ideas = await Idea.find();
        res.json({success: true, data: ideas})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, error: 'BAZI ŞEYLER YOLUNDA GİTMEDİ'})
        
    }
});
// Get single ideas
router.get('/:id', async (req,res) =>
{
    try {
        const idea = await Idea.findById(req.params.id);
        res.json({success:true,data:idea})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,error:'Bazi şeyleer ters gidiyor'})
    }
    
});

// Add an idea
router.post('/', async (req,res) => {

    const idea = new Idea
        ({
            text: req.body.text,
            tag:req.body.tag,
            username:req.body.username,
        })
        try {
            const savedIdea = await idea.save();
            res.json({success:true,data:idea});

        } catch (error) {
            console.log(error);
            res.status(500).json({success:false,error:'Bir şeyler ters gidiyor hocam'});

        }
    

})

// Update idea
router.put('/:id', async (req,res) =>
{
    try
    {
        const idea = await Idea.findById(req.params.id);

        // Match the usernames
        if(idea.username === req.body.username)
        {

            const updateIdea = await Idea.findByIdAndUpdate(
                req.params.id,
                {
                    $set:
                    {
                        text: req.body.text,
                        tag: req.body.tag,
                        username: req.body.username,
                    }
                },    
                { new:true}
            );
        return res.json({success:true, data: updateIdea});

        }
        // Username does not match 
        res.status(403).json({success:false, error:'You are not authorized to update this resource'})


    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({success:false, error:'Bazi seyler ters gidiyor'}) 
    }
});

// Delete idea
router.delete('/:id', async (req,res) =>
{
    try
    {
        const idea = await Idea.findById(req.params.id);

        // Match the usernames
        if(idea.username == req.body.username)
        {
            await Idea.findByIdAndDelete(req.params.id)
            return res.json({success: true, data: {}});

        }

        // Usernames do not much
        res.status(403).json({success:false, error:'You are not authorized to delete this resource'})

    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({success:false, error:'Bazi hatalar var'})
    }

});




module.exports=router;


