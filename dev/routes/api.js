const router = require('express').Router();
const db = new (require("@replit/database"))();

const BAD_WORDS = ['fuck', 'faggot', 'anal', 'anus', 'areola', 'arse', 'asshole', 'balllicker', 'ballsack', 'biatch', 'bitch', 'blowjob', 'boob', 'butt', 'boobies', 'breasts', 'balls', 'cunt', 'script', 'style', '<', '>', 'sus'];

/* The API endpoint to send wishes */

router.post('/wish', async (req, res) => {
  try {
    if (req.body && req.body.name && req.body.wish) {
      let wishes = await db.get('wishes');
      if (!wishes) wishes = [];
      wishes.push(req.body);
      for (let i = 0; i < BAD_WORDS.length; i++) {
        if (req.body.name.toLowerCase().includes(BAD_WORDS[i]) || req.body.wish.toLowerCase().includes(BAD_WORDS[i])) {
          res.status(401).send('BAD WORD FOUND. NOT ALLOWED.');
          return;
        } else if (i === (BAD_WORDS.length - 1)) {
          await db.set('wishes', wishes);
          res.send('WISHED APOORV HAPPY BIRTHDAY AS ' + req.body.name);
        }
      }
    } else {
      res.status(400).send('BAD REQUEST SMH');
    }
  } catch (e) {
    console.error(e);
  }
});

/* The API to search for anime */

router.post('/suggest', async (req, res) => {
  try {
    if (req.body && req.body.title && req.body.synopsis && req.body.episodes && req.body.imageUrl && req.body.type) {
      let anime = await db.get('anime');
      if (!anime) anime = [];
      let check = anime.filter(a => a.title === req.body.title);
      if (check.length < 1)
        anime.push(req.body);
      await db.set('anime', anime);
      res.send('Added ' + req.body.title);
    } else {
      console.log(req.body);
      res.status(400).send('BAD REQUEST SMH');
    }
  } catch (e) {
    console.error(e);
  }
});

router.post('/admin', async (req, res) => {
  try {
    if (req.body && req.body.password && req.body.password === process.env.password) {
      res.status(200).send('yes');
    } else {
      res.status(401).send('no');
    }
  } catch (e) {
    console.error(e);
  }
});

router.get('/wishes', async (req, res) => {
  res.send(await db.get('wishes'));
});

router.post('/delete-wish', async (req, res) => {
  try {
    if (req.body && req.body.password && req.body.password === process.env.password) {
      if (req.body.id) {
        let wishes = await db.get('wishes');
        if (!wishes) wishes = [];
        wishes.splice(req.body.id, 1);
        await db.set('wishes', wishes);
        res.status(200).send('deleted');
      } else res.status(400).send('no');
    } else res.status(401).send('no');
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;