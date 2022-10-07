const db = require('../models/manytomany/index');
const asyncHandler = require('../middleware/async');

const manyToMany = asyncHandler(async (req, res, next) => {
  const createTutorial = function (tutorial) {
    return db.Tutorial.create(tutorial).then((docTutorial) => {
      console.log(docTutorial);
      return docTutorial;
    });
  };

  const createTag = function (tag) {
    return db.Tag.create(tag).then((docTag) => {
      console.log(docTag);
      return docTag;
    });
  };

  const addTagToTutorial = function (tutorialId, tag) {
    return db.Tutorial.findByIdAndUpdate(
      tutorialId,
      { $push: { tags: tag._id } },
      { new: true, useFindAndModify: false }
    );
  };

  const addTutorialToTag = function (tagId, tutorial) {
    return db.Tag.findByIdAndUpdate(
      tagId,
      { $push: { tutorials: tutorial._id } },
      { new: true, useFindAndModify: false }
    );
  };

  const run = async function () {
    var tut1 = await createTutorial({
      title: 'Tut 1',
      author: 'asad',
    });

    var tagA = await createTag({
      name: 'tagA',
      slug: 'tag-a',
    });

    var tagB = await createTag({
      name: 'tagB',
      slug: 'tag-b',
    });

    var tutorial = await addTagToTutorial(tut1._id, tagA);
    console.log(tutorial);

    var tag = await addTutorialToTag(tagA._id, tut1);
    console.log(tag);

    tutorial = await addTagToTutorial(tut1._id, tagB);
    console.log(tutorial);

    tag = await addTutorialToTag(tagB._id, tut1);
    console.log(tag);

    var tut2 = await createTutorial({
      title: 'Tut #2',
      author: 'mohammad',
    });

    tutorial = await addTagToTutorial(tut2._id, tagB);
    console.log(tutorial);

    tag = await addTutorialToTag(tagB._id, tut2);
    console.log(tag);
  };

  run();
  res.status(200).json({
    success: true,
    message: 'One to many relationship completed',
  });
});

module.exports = { manyToMany };
