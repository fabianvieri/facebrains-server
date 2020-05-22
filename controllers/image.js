const clarifai = require('clarifai');

const app = new clarifai.App({
    apiKey: '35943e47a9fb4aa592072bd57c9ac1ba'
});

const handleApi = (req, res) => {
    const { input } = req.body;
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(`error submit image : ${err}`);
        });
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where({ id })
        .increment('entries', 1)
        .returning('entries')
        .then(entry => {
            res.json(entry[0]);
        })
        .catch(err => res.status(400).json(`error update entry : ${err}`));
}

module.exports = {
    handleImage,
    handleApi
};