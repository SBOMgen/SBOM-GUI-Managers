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
                });
            })
            .catch(error => {
                console.error('Error fetching repositories:', error.response ? error.response.data : error.message);
            });
    }
    else {
        res.status(400).json({
            success: false,
            message: "failure",
        });
    }
})

router.get("/workflows", (req, res) => {
    const { repo, owner } = req.query;
    if (!repo || !owner || !req.user)
    {
        res.status(400).json({
            success: false,
            message: "failure",
          });
    }
    console.log(req.user.accessToken);
        const options = {
            method: 'GET',
            url: `https://api.github.com/repos/${owner}/${repo}/actions/runs`,
            headers: {
                'Authorization': `Bearer ${req.user.accessToken}`,
                'User-Agent': 'SBOM-UI'
            },
          };
          console.log(options.url);
          axios(options)
            .then(response => {
              const workflows = response.data.workflow_runs;
            //   console.log(response);
              let sbom_workflows = [];
              for (let index = 0; index < workflows.length; index++) {
                if (workflows[index].name == "Create SBOM")
                {
                    sbom_workflows.push(workflows[index]);
                }
                res.status(200).json({
                    success: true,
                    message: "successfull",
                    user: req.user,
                    data: sbom_workflows
                });
            }})
            .catch(error => {
                console.error('Error fetching repositories:', error.response ? error.response.data : error.message);
            });
        // console.log(user)
    
})


module.exports = router