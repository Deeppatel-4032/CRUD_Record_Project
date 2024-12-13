const records_model = require("../models/recode_model.js");
const fs = require("fs");


// submit showRecordsForm
exports.getAllRecords = (req, res) => {
  res.render("index");
};

//Show Records Data 
exports.showDataRecord = async (req, res) => {
  const perPage = 3; // Number of records per page
  const page = parseInt(req.query.page) || 1; // Current page, defaults to 1
  
  const totalRecords = await records_model.countDocuments(); // Total records in the database
  const totalPages = Math.ceil(totalRecords / perPage); // Total pages
  const records = await records_model.find({})
    .skip((page - 1) * perPage) // Skip records for previous pages
    .limit(perPage); // Limit records for current page
    res.render("showRecord", { records, totalPages, page,});
};

// Create Record
exports.createRecord = async (req, res) => {
  try {
    const createRecordData = new records_model({
        img_Path : req.file.path,
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        createDate : req.body.createDate,
    });
    console.log("createRecordData >>>", createRecordData);
    
    const newCreateData = await createRecordData.save();
    console.log("newCreateData >>>", newCreateData);
    
    res.redirect("/showRecord");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get Single Record for Edit
exports.getRecordForEdit = async (req, res) => {
    try {
      const {id} = req.params;
      const record = await records_model.findOne({_id : id});
      console.log("record >>>>", record);
      
       await res.render("editRecord.ejs", { record : record });
      
    } catch (err) {
      res.status(500).send("Error retrieving record");
    }
  };
  
  // Update Record
exports.updateRecord = async (req, res) => {
  const { id } = req.params; // Extract the record ID from request parameters

  try {
    // Fetch the record to update
    const existingRecord = await records_model.findById(id);

    if (!existingRecord) {
       res.status(404).send("Record not found");
    }

    console.log("Existing Record:", existingRecord);

    // Handle image update if a new image is provided
    if (req.file && req.file.path) {
      // Delete the old image file if it exists
      if (existingRecord.img_Path) {
        try {
          fs.unlinkSync(existingRecord.img_Path);
          console.log("Old image file deleted successfully.");
        } catch (err) {
          console.error("Error deleting old image file:", err);
        }
      }
      // Update the image path in the record
      existingRecord.img_Path = req.file.path;
    }

    // Update other fields
    existingRecord.name = req.body.name; 
    existingRecord.email = req.body.email;
    existingRecord.phone = req.body.phone; 
    existingRecord.createDate = req.body.createDate;

    // Save the updated record to the database
    const updatedRecord = await existingRecord.save();

    console.log("Updated Record:", updatedRecord);

    // Redirect or send success response
    res.redirect("/showRecord");
  } catch (err) {
    console.error("Error updating record:", err);
    res.status(500).send("Error updating record");
  }
};

// Soft Delete Record
exports.softDeleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const softDeleteRecord = await records_model.findByIdAndUpdate(id, { status: false });
    console.log("softDeleteRecord >>>", softDeleteRecord);
    
    res.redirect("/showRecord");
  } catch (err) {
    res.status(500).send("softDeleteRecord Error", err);
  }
};

// Single Delete Record
exports.singleDeleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the record
    const singleDeleteRecord = await records_model.findByIdAndDelete({_id : id});

    if (!singleDeleteRecord) {
      res.status(404).send("Record not found");
    }
    console.log("Deleted Record:", singleDeleteRecord);

    // Delete the associated image file if it exists
    if (singleDeleteRecord.img_Path) {
      try {
        fs.unlinkSync(singleDeleteRecord.img_Path);
        console.log("Image file deleted successfully.");
      } catch (err) {
        console.error("Error deleting image file:", err);
      }
    }

    // Redirect after successful deletion
    res.redirect("/showRecord");
  } catch (err) {
    console.error("Error deleting record:", err);
    res.status(500).send("Error deleting record");
  }
};


// Delete Multiple Records
exports.multiDelete = async (req, res) => {
  try {
     const { recordIds, action } = req.body;
     const {ids } = req.params;

     // Find records to delete
     const recordsToDelete = await records_model.find({ _id: { $in: ids } });

    // Validate that recordIds are provided
    if (!recordIds || recordIds.length === 0) {
        res.status(400).send("No records selected.");
    }

    // Permanent Delete
    if (action === "permanentDelete") {

      // Delete associated image files if they exist
     recordsToDelete.forEach(record => {
      if(record.img_Path) {
        try {
          fs.unlinkSync(record.img_Path);
          console.log(`Image file deleted for record ID: ${record._id}`);
        } catch (err) {
          console.error(`Error deleting image file for record ID: ${record._id}`, err);
        }
      }
    });

      const allRecordsToDelete = await records_model.deleteMany({ _id: { $in: recordIds } });
      console.log("allRecordsToDelete >>>", allRecordsToDelete);
     
      res.redirect("/showRecord");
    } else {
      // Invalid Action
      res.status(400).send("Invalid action specified.");
    }

  } catch (error) {

    console.error(error);
    res.status(500).send("Error occurred while deleting records.");
  }
};

exports.searchDataRecord = async (req, res) => {
  const { search, page = 1 } = req.query;
  const limit = 3; // Default limit per page
  const query = {};

  if (search) {
    const searchRegex = new RegExp(search, 'i');
    query.$or = [
      { name: searchRegex },
      { email: searchRegex },
      { phone: searchRegex }
    ];
  }

  const totalRecords = await records_model.countDocuments(query);
  const records = await records_model.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  res.render('searchRecord', {
    records,
    totalPages: Math.ceil(totalRecords / limit),
    page: parseInt(page, 3),
    searchQuery: search
  });
};


