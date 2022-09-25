const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include : [{
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
    }]
  })
  .then((dbUserData) => res.json(dbUserData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
 const id = req.params.id;
 Tag.findOne({where: {id:id,},
    attributes:["id", "tag_name"],
    include: [
        {
            model: Product,
            attributes:["id", "product_name", "price", "stock", "category_id"],
        }
    ]
})
.then((dbPostData) => {
    if(!dbPostData) {
        res.status(404).json({message: " No tag matching that ID found, please try again."});
        return;
    }
    res.json(dbPostData);
})
.catch((err)=> {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  const tag_name = req.body.tag_name;
  Tag.create({tag_name:tag_name,})
  .then((dbPostData) => res.json(dbPostData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const tag_name = req.body.tag_name;
  const  id = req.params.id;
  Tag.update({ tag_name: tag_name,},
    {where:{id:id}
})
.then((dbPostData) => {
    if(!dbPostData) {
        res.status(404).json({ message: "No tag matching that ID found, please try again."});
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
  // delete on tag by its `id` value
  const id = req.params.id;
  Tag.destroy({ where: {id:id,}})
  .then((dbPostData) => {
    if(!dbPostData) {
        res.status(404).json({message: " No tag matching that ID found, please try again."});
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