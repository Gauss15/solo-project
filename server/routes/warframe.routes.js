const WarframeController = require("../controllers/warframe.controller");

module.exports = (app) => {
    app.post('/api/warframes', WarframeController.createNewWarframe);
    app.get('/api/warframes', WarframeController.getAllWarframes);
    app.get('/api/warframes/:id', WarframeController.frameById);
    app.put('/api/warframes/:id', WarframeController.editWarframe);
    app.delete('/api/warframes/:id', WarframeController.deleteWarframe);
}