import express from 'express';
import Profile from '../../models/Profile';
import User from '../../models/User';
import Post from '../../models/Post';
import auth from '../../middleware/auth';
import {check, validationResult} from 'express-validator';
import config from 'config';
import request from 'request';
const router = express.Router();
//@route GET api/profile/me
//@desc Get the profile of the current user
//@access Private
router.get('/me',auth, async (req,res)=>{
    try{
        
        
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        if(!profile)
        return res.status(400).json({msg:'There is no profile for this user'});
          res.json({profile});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!!');
    }
});
//@route GET api/profile
//@desc create and update user profile
//@access Private
router.post('/',
[auth,
    [
    check('status','Status is required!!')
    .not()
    .isEmpty(),
    check('skills','Skills are required!!')
    .not()
    .isEmpty()
    ]
],
async (req,res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
}
const {
   // user
    company,
    website,
    location,
    status,
    skills,
    bio,
    youtube,
    facebook,
    instagram,
    twitter,
    linkedln,
    githubusername
} = req.body;
//Build profileFields object
const profileFields = {};
profileFields.user = req.user.id;
if(company)profileFields.company = company;
if(website)profileFields.website = website;
if(location)profileFields.location = location;
if(status)profileFields.status = status;
if(githubusername)profileFields.githubusername = githubusername;

if(skills){

    profileFields.skills = skills.split(',').map(skill => skill.trim());
}
if(bio)profileFields.bio = bio;
 profileFields.social ={};

if(youtube)profileFields.social.youtube = youtube;
if(facebook)profileFields.social.facebook = facebook;
if(instagram)profileFields.social.instagram = instagram;
if(twitter)profileFields.social.twitter = twitter;
if(linkedln)profileFields.social.linkedln = linkedln;


try{

    let profile = await Profile.findOne({user:req.user.id});
    if(profile)
    {
    profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true } 
        );
    }
    else {
        profile = new Profile(profileFields);
        await profile.save(); 
    }
    return res.json(profile);
}catch(err)
{
    console.error(err.message);
    res.status(500).send('Server Error!!');
}
});
//@route GET api/profile
//@desc Get all profiles
//@access public
router.get('/', async (req,res)=>{
try {
 const profiles = await Profile.find().populate('user',['name','avatar']);
 res.json(profiles);
} catch (err) {
  console.error(err.message);
    res.status(500).send('Server Error!!');   
}
});
//@route GET api/profile/user/:user_id
//@desc Get profile by user id
//@access public
router.get('/user/:user_id',async (req,res)=>{
try {
   
    
    const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);

    if(!profile)
    return res.status(404).json({msg: 'User is not found'})

    res.json(profile);
} catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId'){
        return res.status(400).json({msg: 'User is not found'});
    }
    res.status(500).json({ msg:'Server Error!!'});   
}
});
//@route GET api/profile
//@desc Delete the user profile
//@access private
router.delete('/',auth,async (req,res)=>{
    try {
       
        
        await Profile.findOneAndDelete({user:req.user.id});
        await User.findOneAndDelete({_id:req.user.id});
        await Post.deleteMany({user:req.user.id});
         res.status(400).json({msg: 'User and Profile is Deleted!!'})
    
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!!');   
    }
    });
//@route PUT api/profile/experience
//@desc Add experience to the  profile
//@access private

router.put('/experience',[auth,
    [
        check('title','Title is required!!')
        .not()
        .isEmpty(),
        check('company','Company is required!!')
        .not()
        .isEmpty()
    ]

],
async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {
         title,  
        company,
        fromDate,
        toDate,
        isCurrentJob,
        description

    } = req.body;

let newExperience = {};
newExperience.title = title;
newExperience.company = company;
if(fromDate)  newExperience.from = fromDate;
if(toDate) newExperience.to = toDate;
if(isCurrentJob) newExperience.current = isCurrentJob;
if(description) newExperience.description = description;

    try {
       
      const profile = await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExperience);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!!');   
    }
    });
//@route DELETE api/profile/experience/:experience_id
//@desc Delete experience from the  profile
//@access private
router.delete('/experience/:experience_id',auth,async (req,res)=>{
    try {

        const profile =   await Profile.findOne({user:req.user.id});
    //list the id's of experiences as an array and finds out the index of send id in the array of experience.
       const removeIndex = profile.experience
                            .map(experience=>experience.id)
                            .indexOf(req.params.experience_id);
        profile.experience.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!!');   
    }
    });

//@route PUT api/profile/education
//@desc Add education to the  profile
//@access private

router.put('/education',[auth,
    [
        check('school','School is required!!')
        .not()
        .isEmpty(),
        check('degree','Degree is required!!')
        .not()
        .isEmpty(),
        check('fieldofstudy','Field Of Study is required!!')
        .not()
        .isEmpty(),
        check('from','From Date is required!!')
        .not()
        .isEmpty(),
        check('description','Description is required!!')
        .not()
        .isEmpty()
    ]

],
async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {
        school,  
        degree,
        fieldofstudy,
        from,
        current,
        description

    } = req.body;

let education = {
        school,  
        degree,
        fieldofstudy,
        from,
        current,
        description
};
    try {
       
      const profile = await Profile.findOne({user:req.user.id});
        profile.education.unshift(education);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!!');   
    }
    });
//@route DELETE api/profile/educatin/:education_id
//@desc Delete education from the  profile
//@access private
router.delete('/education/:education_id',auth,async (req,res)=>{
    try {
     
     const profile =   await Profile.findOne({user:req.user.id});
    //list the id's of experiences as an array and finds out the index of send id in the array of experience.
       const removeIndex = profile.education
                            .map(education=>education.id)
                            .indexOf(req.params.education_id);
        profile.education.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!!');   
    }
    });

//@route GET api/profile/github/:username
//@desc Get the repos from the github
//@access Public
router.get('/github/:username', async (req,res)=>{
    try{
        
       const options = {
           uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientID')}&client_secret=${config.get('githubClientSecret')}`,
           method:'GET',
           headers:{'user-agent':'node.js'}
       };
       request(options,(error,response,body)=>{
        if(error) console.error(error);

        if(response.statusCode!==200){
            res.status(404).json({msg:'No Github Profile Found!!'});
        }
        res.json(JSON.parse(body));
       });

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!!');
    }
});
//@r

module.exports = router;