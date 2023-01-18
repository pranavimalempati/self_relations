const { PrismaClient } = require("@prisma/client");
const appConst = require("../appConstants");
const prisma = new PrismaClient();

// one-to-one CRUD
// insert 
const create = async (req, res) => {
  try {
    const resp = await prisma.student.create({
      data: {
        studentName: req.body.studentName,
        post: {
          create: {
            authorName: req.body.authorName,
          },
        },

      },
      include: {
        post: true
      }
    });
    console.log(resp.post.authorId);
    res.status(200).json({
      message: appConst.status.success,
      Response: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: appConst.status.fail,
      Response: error.message,
    });
  }
};

//bulk insert
const add = async (req, res) => {
  try {
    const student = req.body;
    let resp = [];
    if (student && Array.isArray(student)) {
      for (let index = 0; index < student.length; index++) {
        const element = student[index];
        let result = await prisma.student.create({
          data: {
            studentName:element.studentName,
            post: {
              create: {
                authorName: element.authorName,
              },
            },
          },
          include: {
            post: true,
          },
        });
        resp.push(result)
      }
    } else {
      const result1 = await prisma.student.create({
        data: {
          studentName:req.body.studentName,
          post: {
            create: {
              authorName: req.body.authorName,
            },
          },
        },
        include: {
          post: true,
        },
      });
      resp.push(result1);
    }
    res.send(resp);
  } catch (error) {
    console.log(error);
    res.send(error);
  }

};

//update
const update = async (req, res) => {
  try {
    const resp = await prisma.student.update({
      where: {
        id: String(req.body.id)
      },
      data: {
        studentName: req.body.studentName,
        post: {
          update: {
            authorName: req.body.authorName,
          },
        },
      },
      include: {
        post: true
      }
    });
    console.log(resp.post.authorId);
    res.status(200).json({
      message: appConst.status.success,
      Response: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: appConst.status.fail,
      Response: error.message,
    });
  }
};

//find
const find = async (req, res) => {
  try {
    const resp = await prisma.student.findFirst({
      where: {
        studentName: String(req.body.studentName)
      },
      include: {
        post: true
      }
    });
    console.log(resp);
    res.status(200).json({
      message: appConst.status.success,
      Response: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: appConst.status.fail,
      Response: error.message,
    });
  }
};

//remove
const remove = async (req, res) => {
  try {
    const resp = await prisma.post.delete({
      where: {
        authorId: String(req.body.id)
      }
    });
    await prisma.student.delete({
      where: {
        id: String(req.body.id)
      },
    })
    console.log(resp);
    res.status(200).json({
      message: appConst.status.success,
      Response: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: appConst.status.fail,
      Response: error.message,
    });
  }
};

//one-to-many CRUD
//insert
const insert = async (req, res) => {
  try {
    const resp = await prisma.studt.create({
      data: req.body,
      include: {
        books: true
      }
    });
    console.log(resp);
    res.status(200).json({
      message: appConst.status.success,
      Response: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: appConst.status.fail,
      Response: error.message,
    });
  }
};

const find1 = async (req, res) => {
  try {
    const resp = await prisma.studt.findFirst({
      where: {
        id: String(req.body.id)
      },
      include: {
        books: true
      }
    });
    console.log(resp);
    res.status(200).json({
      message: appConst.status.success,
      Response: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: appConst.status.fail,
      Response: error.message,
    });
  }
};

const update1 = async (req, res) => {
  try {
    const resp = await prisma.studt.update({
      where: {
        id: String(req.body.id)
      },
      data: req.body,
      include: {
        books: true
      }
    });
    console.log(resp);
    res.status(200).json({
      message: appConst.status.success,
      Response: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: appConst.status.fail,
      Response: error.message,
    });
  }
};

const remove1 = async (req, res) => {
  try {
    const resp = prisma.books.deleteMany({
      where: {
        bookId: String(req.body.id)
      }
    });
    await prisma.studt.delete({
      where: {
        id:{
          in:String(req.body.id)
        } 
      },
    })
    console.log(resp);
    const transaction = await prisma.$transaction([resp])
    res.status(200).json({
      message: appConst.status.success,
      Response: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: appConst.status.fail,
      Response: error.message,
    });
  }
};




module.exports = { create, update, find, remove, insert ,add,update1,find1,remove1};
