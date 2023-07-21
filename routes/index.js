const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFound = require('../errors/NotFound');

const {
  JoiValidateLogin, JoiValidateCreateUser,
} = require('../middlewares/valid');

const auth = require('../middlewares/auth');

const {
  login, createUser,
} = require('../controllers/users');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', JoiValidateLogin, login);
router.post('/signup', JoiValidateCreateUser, createUser);

router.use(auth);

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);

router.all('*', auth, (req, res, next) => next(
  new NotFound('Запрашиваемый адрес не найден'),
));

module.exports = router;
