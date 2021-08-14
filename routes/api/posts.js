import express from 'express';
import {check, validationResult} from 'express-validator';
import User from '../../models/User';
import Post from '../../models/Post';
import auth from '../../middleware/auth';
const router = express.Router();


//@route POST api/posts
//@desc Create a posts
//@access Private
router.post(
    '/',
    [auth, [check('text', 'Text is required').not().isEmpty()]],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findById(req.user.id).select('-password');
  
        const newPost = new Post({
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        });
  
        const post = await newPost.save();
  
        res.json(post);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
//@route GEt api/posts
//@desc Get all the posts
//@access Private
router.get('/',auth, async (req,res)=>{
    try{
        const posts = await Post.find({});
        if(!posts)
        return res.status(400).json({msg:'No post found for this user!!'});
        res.json(posts);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!!');
    }
});

//@route GEt api/posts/:post_id
//@desc Get Post of the given id
//@access Private
router.get('/:post_id',auth, async (req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);
        if(!post)
        return res.status(400).json({msg:'No post found for this user!!'});
        res.json(post);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!!');
    }
});

//@route DELETE api/posts/:post_id
//@desc Delete post of the given ID
//@access Private
router.delete('/:id',auth, async (req,res)=>{

try{
        await Post.findOneAndRemove(req.params.post_id);
         return res.status(200).json({msg:'Post is successfully deleted!!'});

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!!');
   }
});
//@route PUT api/posts/like/:post_id/
//@desc Like the post
//@access Private

router.put('/like/:post_id',auth, async (req,res)=>{
    try {
      const post =  await Post.findById(req.params.post_id);
    if( post.likes.filter(like => like.user.toString() === req.user.id).length > 0)
    return res.status(400).json({msg:'Post have already been liked!!'});

    post.likes.unshift({user: req.user.id});
    await post.save();
    res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!!');
    }
})

//@route PUT api/posts/unlike/:post_id/
//@desc Unlike the post
//@access Private

router.put('/unlike/:post_id',auth, async(req,res)=>{
    try {
      const post =  await Post.findById(req.params.post_id);
    if(  post.likes.filter(like => like.user.toString() === req.user.id).length === 0)
    return res.status(400).json({msg:'Post have not been liked yet!!'});

   const removeIndex =  post.likes.map(like  => like.user.toString()).indexOf(req.user.id);
   post.likes.splice(removeIndex,1);
   await post.save();
    res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!!');
    }
})
//@route PUT api/posts/comment/post_id
//@desc Add comment to the post 
//@access Private

router.put('/comment/:post_id',[auth,
    [
      check('text','There must be some text to post as comment.').not().isEmpty(),
    ]
],
async (req,res)=>{
// Finds the validation errors in this request and wraps them in an object with handy functions
const errors = validationResult(req);
if (!errors.isEmpty()) 
  return res.status(422).json({ errors: errors.array() });

try{

    const post = await Post.findById(req.params.post_id);
    const user = await User.findById(req.user.id).select('-password');
   
    const newComment = {
        text:req.body.text,
       // if(req.body.date)date:req.body.text,
        avatar:user.avatar,
        user:req.user.id,
        name:user.name
    };
    if(req.body.date) newComment.date=req.body.date;
    post.comments.unshift(newComment);
    console.log(newComment);
    await post.save();
    res.json(post.comments);
} catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//@route DELETE api/posts/comment/:post_id/:comment_id
//@desc Delete comment  of the given ID
//@access Private
router.delete('/comment/:post_id/:comment_id',auth, async (req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);
        //Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        //Make sure comment exists
        if(!comment)
        return res.status(404).json({msg:'Comment does not exist.'});
        //check User
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({msg:'User is not authorized!!'});
        }
        post.comments = post.comments.filter(
            ({ id }) => id !== req.params.comment_id
          );
         
          await post.save();
          return res.json(post.comments);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!!');
    }
});
module.exports = router;