const router = require("express").Router();
const passport = require("passport");
const axios = require('axios');


router.get("/repos", (req, res) => {
    if (req.user) {
        const options = {
        method: 'GET',
        url: 'https://api.github.com/user/repos',
        headers: {
          'Authorization': `Bearer ${req.user.accessToken}`,
          'User-Agent': 'SBOM-UI'
        },
      };
      
      axios(options)
        .then(response => {
          const repos = response.data;
          console.log(repos);
          res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            data: repos
            //   cookies: req.cookies
          });
        })
        .catch(error => {
          console.error('Error fetching repositories:', error.response ? error.response.data : error.message);
        });
    // console.log(user);
    }
})

module.exports = router