const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ["category_name"],
    include: [{
        model: Product,
        attributes: ["product_name"]
    },
    ],
  })
  .then((dbPostData) => res.json(dbPostData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  const id = req.params.id;

  Category.findOne({
    where: {
        id: id,
    },
    attributes:["category_name"],
    include: [
        {
            model: Product,
            attributes:["product_name"],
        },
    ],
  })
  .then((dbPostData) => {
    if (!dbPostData) {
        res.status(404).json({ message: "No category matching this ID found, Please try again."});
        return;
    }
    res.json(dbPostData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  const category_name = req.body.category_name;
  Category.create({
    category_name:category_name,
  })
  .then((dbPostData) => res.json(dbPostData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const id = req.params.id;
  Category.update(req.body,{
    where:{ id:id, },
  })
  .then((dbPostData)=> {
    if(!dbPostData) {
        res.status(404).json({ message: "No category matching this ID found, Please try again."});
        return;
    }
    res.json(dbPostData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const id = req.params.id;
  Category.destroy({
    where:{ id:id, },
  })
  .then((dbPostData) => {
    if(!dbPostData) {
        res.status(404).json({ message: "No category matching this ID found, Please try again."});
        return;
    }
    res.json(dbPostData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;