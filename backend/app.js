var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const usuarioRoutes = require('./routes/usuario.routes');
const tareaRoutes = require('./routes/tarea.routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuario', usuarioRoutes);
app.use('/tarea', tareaRoutes);



module.exports = app;
