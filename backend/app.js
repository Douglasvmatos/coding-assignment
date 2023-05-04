const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const parentsData = JSON.parse(fs.readFileSync('Parent.json'));
const childrenData = JSON.parse(fs.readFileSync('Child.json'));

app.get('/parents', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 2;
  const sortBy = req.query.sortBy || 'id';
  const sortOrder = req.query.sortOrder || 'asc';

  const sortedParents = parentData.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }
  });

  const parents = sortedParents.slice((page - 1) * pageSize, page * pageSize).map((p) => {
    const children = childrenData.filter((child) => child.parentId === p.id);
    const totalPaidAmount = children.reduce((total, child) => total + child.paidAmount, 0);
    return {
      ...p,
      totalPaidAmount,
    };
  });

  res.json({
    data: parents,
    page,
    pageSize,
    totalPages: Math.ceil(parentData.length / pageSize),
  });
});

app.get('/parents/:parentId/children', (req, res) => {
  const parentId = parseInt(req.params.parentId);
  const children = childrenData.filter((child) => child.parentId === parentId);

  res.json(children);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const parentData = JSON.parse(fs.readFileSync('Parent.json'));

