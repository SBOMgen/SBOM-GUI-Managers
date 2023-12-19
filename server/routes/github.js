const router = require("express").Router();
const passport = require("passport");
const axios = require('axios');
const unzipper = require('unzipper');
const fs = require('fs');


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
            }
            res.status(200).json({
                success: true,
                message: "successfull",
                user: req.user,
                data: sbom_workflows
            });
        })
            .catch(error => {
                console.error('Error fetching repositories:', error.response ? error.response.data : error.message);
            });
        // console.log(user)
    
})


router.get("/artifacts", (req, res) => {
    const { repo, owner, run_id } = req.query;

        const options = {
            method: 'GET',
            url: `https://api.github.com/repos/${owner}/${repo}/actions/runs/${run_id}/artifacts`,
            headers: {
                'Authorization': `Bearer ${req.user.accessToken}`,
                'User-Agent': 'SBOM-UI'
            },
        };
        let sbom, htmlContent, vdr;

        axios(options)
            .then(async response => {
                const artifacts = response.data.artifacts;
                console.log(artifacts);
                for (let index = 0; index < artifacts.length; index++) {
                    if (artifacts[index].name.search("vulRep")!=-1 && artifacts[index].name.search("json")!=-1 && artifacts[index].name.search("vdr")!=-1)
                    {
                        try {
                            const options = {
                                method: 'GET',
                                url: artifacts[index].archive_download_url,
                                headers: {
                                    'Authorization': `Bearer ${req.user.accessToken}`,
                                    'User-Agent': 'SBOM-UI'
                                },
                                responseType: 'arraybuffer'
                            };
                            const response = await axios(options)
                                const unzipped = await unzipper.Open.buffer(Buffer.from(response.data));
    
                                const file = unzipped.files.find(entry => entry.type === 'File');
                                if (file) {
                                  vdr = await JSON.parse(await file.buffer());
                                }
                        } catch (error) {
                            
                            console.error('Error fetching vdr:', error.response ? error.response : error.message);
                        }
                    }
                    if (artifacts[index].name.search("sbom")!=-1 && artifacts[index].name.search("json")!=-1)
                    {
                        try {
                            const options = {
                                method: 'GET',
                                url: artifacts[index].archive_download_url,
                                headers: {
                                    'Authorization': `Bearer ${req.user.accessToken}`,
                                    'User-Agent': 'SBOM-UI'
                                },
                                responseType: 'arraybuffer'
                            };
                            const response = await axios(options)
                                const unzipped = await unzipper.Open.buffer(Buffer.from(response.data));
    
                                const file = unzipped.files.find(entry => entry.type === 'File');
                                if (file) {
                                  sbom = await JSON.parse(await file.buffer());
                                }
                        } catch (error) {
                            
                            console.error('Error fetching sbom:', error.response ? error.response : error.message);
                        }
                    }
                    if (artifacts[index].name.search("vulRep")!=-1 && artifacts[index].name.search("html")!=-1)
                    {
                        try {
                            const options = {
                                method: 'GET',
                                url: artifacts[index].archive_download_url,
                                headers: {
                                    'Authorization': `Bearer ${req.user.accessToken}`,
                                    'User-Agent': 'SBOM-UI'
                                },
                                responseType: 'arraybuffer'
                            };
                            const response = await axios(options)
                                const unzipped = await unzipper.Open.buffer(Buffer.from(response.data));
    
                                const file = unzipped.files.find(entry => entry.type === 'File');
                                if (file) {
                                  htmlContent = (await file.buffer('utf-8')).toString();
                                }
                        } catch (error) {
                            
                            console.error('Error fetching html');
                        }
                    }
                }
                res.status(200).json({
                    success: true,
                    message: "successfull",
                    user: req.user,
                    data: [sbom, vdr, htmlContent]
                });

            })
            // .catch(error => {
            //     console.error('Error fetching repositories:', error.response ? error.response.data : error.message);
            // });
})


module.exports = router