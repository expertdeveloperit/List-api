import List from '../models/list-model';

module.exports = { 

	getLists(user, req, res, next) {
	let user_id = user._id;
    List.find({user_id})
    	.then( data => {
    		if(data.length) {
				res.status(200).json({
	    			status:true,
	    			message:"All Lists Items",
	    			lists:data
	    		});
    		} else {
    		 res.status(200).json({
	    		status:true,
	    		message:'No data found',
	    		lists:[]
	    	 });
    		}
    	})
    	.catch(err => {
    	  res.status(500).json({
    		status:false,
    		message:err.message
    	 });
      });
	},

	addLists(user, req, res, next) {

	let title = req.body.title,
	    description = req.body.description,
	    user_id = user._id;

	if(title && description ) {

	let newList = new List({
		title,
		description,
		user_id
	});
	
    newList.save()
    	.then( data => {
    		if(data) {
				res.status(200).json({
	    			status:true,
	    			message:"List saved",
	    			data
	    		});
    		} else {
    		 res.status(404).json({
	    		status:false,
	    		message:'No data found'
	    	 });
    		}
    	})
    	.catch(err => {
    	  res.status(500).json({
    		status:false,
    		message:err.message
    	 });
      });
     } else {
     	 res.status(422).json({
    		status:false,
    		message:'title and description are required'
    	 });
     }
	},

	getSingleList(user, req, res, next) {
	 let list_id = req.params.id;
	 let user_id = user.user_id;

	 List.findById({_id:list_id })
    	.then( data => {
    		if(data) {
				res.status(200).json({
	    			status:true,
	    			message:"List Item",
	    			data
	    		});
    		} else {
    		 res.status(200).json({
	    		status:true,
	    		message:'No data found'
	    	 });
    		}
    	})
    	.catch(err => {
    	  res.status(500).json({
    		status:false,
    		message:err.message
    	 });
      });
	},

	updateLists(user, req, res, next) {

	let list_id = req.params.id,
	    title = req.body.title,
	    description = req.body.description;

	let user_id = user.user_id;

	let newList = {
		title,
		description
	};
	
	
    List.findByIdAndUpdate({
          _id:list_id ,
          user_id
    	},newList,{
    		new:true
    	})
    	.then( data => {
    		if(data) {
				res.status(200).json({
	    			status:true,
	    			message:"Item updated",
	    			data
	    		});
    		} else {
    		 res.status(404).json({
	    		status:false,
	    		message:'No data found'
	    	 });
    		}
    	})
    	.catch(err => {
    	  res.status(500).json({
    		status:false,
    		message:err.message
    	 });
      });
	},

	deleteLists(user, req, res, next) {

	let list_id = req.params.id,
	    user_id = user._id;
	
    List.findByIdAndDelete({
          _id:list_id
    	})
    	.then( data => {
    		if(data) {
    			List.find({ user_id })
    			.then(data1 => {
    				if(data1.length) {
    					res.status(200).json({
			    			status:true,
			    			message:"Item deleted",
			    			lists:data1
			    		});
    				} else {
    					res.status(200).json({
				    		status:true,
				    		message:'No data found',
				    		lists:[]
				    	 });
    				}
    			})
    			.catch(err => {
		    	  res.status(500).json({
		    		status:false,
		    		message:err.message
		    	 });
		      });
    		} else {
    		 res.status(404).json({
	    		status:false,
	    		message:'No data found'
	    	 });
    		}
    	})
    	.catch(err => {
    	  res.status(500).json({
    		status:false,
    		message:err.message
    	 });
      });
	}
};