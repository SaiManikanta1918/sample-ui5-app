sap.ui.define(["sap/ui/core/mvc/Controller"], function (oController) {
  "use strict";
  return oController.extend("sap.app.controller.BaseController", {
    onInit: function () {
      console.log("base controller");
      this.oRouter = this.getOwnerComponent().getRouter();
    },
  });
});
