const express=require('express');
const router=express.Router();
const mongoose= require('mongoose');

//defien schema
const noticeSchema=new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: {
  type: Date,
  default: Date.now
},


});

//create model
const Notice=mongoose.model('Notice',noticeSchema);

//POST route to add notice
router.post('/', async (req, res) => {
  try {
    console.log("✅ Incoming req.body:", req.body);

    // Optional validation
    if (!req.body.title || !req.body.description) {
      return res.status(400).json({ error: 'Missing title or description' });
    }

    const newNotice = new Notice({
      title: req.body.title,
      description: req.body.description
      // Remove 'date' from here to let default handle it
    });

    const saved = await newNotice.save();
    console.log("✅ Saved Notice:", saved);

    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Full error trace:", err.stack || err.message || err);
    res.status(500).json({ error: err.message || 'Failed to save notice' });
  }
});


//GET route to fetch notices
router.get('/',async(req,res)=>{
  try{
    const notices=await Notice.find().sort({date:-1});
    res.json(notices);
  }catch(err){
    res.status(500).json({error:'error fetching notices'});
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log("Attempting to delete:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const deleted = await Notice.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Notice not found' });
    }
    res.json({ message: 'Notice deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err.message || err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports=router;