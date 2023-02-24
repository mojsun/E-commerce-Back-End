const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const TagData = await Tag.findAll();
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const TagData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "Product_Tag" }],
    });

    if (!TagData) {
      res.status(404).json({ message: "No Tag found with this id!" });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const TagData = await Tag.create(req.body);
    res.status(200).json(TagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const TagData = await Tag.create({
      where: {
        id: req.params.id,
      },
    });
    if (!TagData) {
      res.status(404).json({ message: "No Tag found with this id to add!" });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const TagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!TagData) {
      res.status(404).json({ message: "No Tag found with this id!" });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
