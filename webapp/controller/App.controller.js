sap.ui.define(["sap/app/controller/BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("sap.app.controller.App", {
    onInit: function () {
      console.log("in app controller");
    },
  });
});
