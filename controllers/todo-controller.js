const prisma = require('../models/prisma');

exports.createTodo = async (req, res, next) => {
  try {
    const { title, completed, dueDate } = req.body;
    // VALIDATE 1.Manual 2.Validation library eg. Joi, Yup, Zod
    await prisma.todo.create({
      data: {
        title,
        completed,
        dueDate,
        user: {
          connect: req.user
        }
      }
    });
    res.status(201).json({ message: 'created' });
  } catch (err) {
    next(err);
  }
};
