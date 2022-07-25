module.exports = {
    create
  };
  
  function create(req, res) {
    console.log('working!')
    res.json({
      user: {
        name: req.body.name,
        email: req.body.email
      }
    });
  }