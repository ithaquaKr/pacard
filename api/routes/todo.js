const router = require("express").Router();
const Todo = require("../models/Todo");
const {
    verifyToken,
    verifyTodoAuthor
  } = require("./verifyToken");
  

//CREATE

router.post("/", verifyToken, async (req, res) => {
    const { title, info,status} = req.body;
    try {
      const newTodo = new Todo({
        title,
        info, 
        status,
        verify: req.user.id
      });
      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);
    } catch (err) {
      res.status(500).json(err);
    }
});

//UPDATE

router.put("/:id", verifyTodoAuthor, async (req, res) => {
    try {
      const updateTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateTodo);
    } catch (err) {
      res.status(500).json(err);
    }
});

//DELETE

router.delete("/:id", verifyTodoAuthor, async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.status(200).json("The document has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});


//GET 
router.get("/", verifyToken, async (req, res) => {
    try {
      const todos = await Todo.find({verify: req.user.id});
      res.status(200).json(todos.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
