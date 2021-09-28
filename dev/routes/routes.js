const router = require('express').Router();
const db = new (require("@replit/database"))();
const mal = new (require('jikan-node'))();
const converter = new (require('showdown')).Converter()

router.get('/', async (req, res) => {
  try {
    let wishes = await db.get('wishes');
    let anime = await db.get('anime');
    if (!wishes) wishes = [];
    if (!anime) anime = [];
    await db.set('wishes', wishes);
    wishes.map(w => {
      w.wish = converter.makeHtml(w.wish);
      return w;
    });
    res.render('index', { wishes, anime });
  } catch (e) {
    console.error(e);
  }
});

router.get('/admin', async (req, res) => {
  try {
    let loggedIn = false;
    if (req.cookies && req.cookies.loggedin && req.cookies.loggedin === process.env.password) loggedIn = true;
    let wishes = await db.get('wishes');
    let anime = await db.get('anime');
    if (!wishes) wishes = [];
    if (!anime) anime = [];
    wishes.map(w => {
      w.html = converter.makeHtml(w.wish);
      return w;
    });
    res.render('admin', { loggedIn, wishes, anime });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;