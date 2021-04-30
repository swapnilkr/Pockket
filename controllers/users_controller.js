// require user
const User = require('../models/user');


module.exports.signIN = function(req,res)
{
    if (req.isAuthenticated())
    {
       return res.redirect('/');
    }
    return res.render('user_sign_in');
}

module.exports.signUP = function(req,res)
{
    if (req.isAuthenticated())
    {
       return res.redirect('/');
    }
    return res.render('user_sign_up');
}

// get the sign up data
module.exports.create=function(req,res){
    // if password and confirm password are different
    if(req.body.password!= req.body.confirm_password)
    {
        return res.redirect('back');
    }
    // if password and confirm password are same
    // we find if the email is already present or not in db

    // we use find function to find data from user schema
    User.findOne({email : req.body.email},function(err,user)
    {
        if(err)
        {
            console.log('error in finding user in signing up');
            return;
        }

        if(!user)
        {
            User.create(req.body,function(err,user)
            {
                console.log('error in creating user while signing up');
                // after creating redirect to sign up page
                return res.redirect('/Signin');
            });
            
        }
        else
        {
            return res.redirect('back');
        }

    });

}

// sign in and create a session for the user
module.exports.createSession=function(req,res){


    //todo later
    return res.redirect('/');
}

// to destroy session after sign out
module.exports.destroySession=function(req,res)
{
    // passport inbuilt lib for sign out
    req.logout();
    
    return res.redirect('/');
}