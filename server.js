// npm packages require to establish server connectivity
const path = "path";
const fs = require("fs");
const express = require("express");

// express set-up
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

var notes = [];

var id;

// read/write notes elements

// delete elements

// api routing elements

// html routing elements
