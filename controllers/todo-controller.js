const prisma = require('../models/prisma');

exports.createTodo = async (req, res, next) => {
  try {
    const { title, completed, dueDate } = req.body;
    // VALIDATE 1.Manual 2.Validation library eg. Joi, Yup, Zod
    // {id: '7de5a1b6-8cc3-4f91-8030-b02184bcd891', title: 'Swimming',
    // completed:false, dueDate: null, userId: '63a39a13-45ec-494d-9267-21894ba8877c'}
    const todo = await prisma.todo.create({
      data: {
        title,
        completed,
        dueDate,
        user: {
          connect: req.user
        }
      }
    });
    res.status(201).json({ message: 'created', todo });
  } catch (err) {
    next(err);
  }
};

exports.getAllTodo = async (req, res, next) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.user.id
      }
    });
    res.status(200).json({ todos });
  } catch (err) {
    next(err);
  }
};
