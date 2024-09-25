const TaskModel = require("../model/TaskModel");



module.exports.getData = async (req, res) => {
  try {
    const data = await TaskModel.find().lean(); // Use .lean() to get plain JS objects
    console.log("get Data===>", data);
    res.status(200).json(data); // Use .json() to send JSON response
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.saveData = (req, res) => {
    const {task} = req.body
    console.log("req.body post data", task);
    TaskModel.create({ task })
        .then(() => {
            console.log("Data saved successfully")
            res.send("Data saved successfully").status(200)
        }).catch((error) => {
            console.log("data not saved", error)
            res.send({"error":error, msg:"data not saved"})
    })
}

module.exports.deleteData = (req, res) => {
    const { id } = req.params
    TaskModel.findByIdAndDelete(id)
        .then(() => {
            console.log("Data deleted successfully")
            res.send("Data deleted successfully")
        }
    ).catch(err => {
        console.log("data not deleted", err);
        res.send(err)
        })
}

module.exports.updateData = (req, res) => {
    const { id } = req.params
    const { task } = req.body
    console.log("id===>", id)
    console.log("task===>", task)
    TaskModel.findByIdAndUpdate(id, { task })
        .then(() => {
        res.send("Updated successfully")
    }).catch(err=>res.send(err))
}