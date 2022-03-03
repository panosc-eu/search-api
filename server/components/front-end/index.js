const path = require("path");


const STATIC_ROOT = path.join(__dirname, "public");

module.exports = function(loopbackApplication, options) {

  const router = new loopbackApplication.loopback.Router();
	router.use(loopbackApplication.loopback.static(STATIC_ROOT));

	loopbackApplication.use("/browse", router);
}
