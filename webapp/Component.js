sap.ui.define(["sap/ui/core/UIComponent"], function (UIComponent) {
  "use strict";
  return UIComponent.extend("sap.app.Component", {
    metadata: {
      manifest: "json",
    },
    init: function () {
      console.log("init called", UIComponent, this);
      UIComponent.prototype.init.apply(this);
      this.oRouter = this.getRouter();
      this.oRouter.initialize();
    },
    // createContent: function () {
    //   console.log("create content");
    //   const oView = new sap.ui.view({
    //     viewName: "sap.app.view.App",
    //     type: "XML",
    //   });

    //   const oContainer = oView.byId("idSpidy");

    //   const oView1 = new sap.ui.view({
    //     viewName: "sap.app.view.View1",
    //     id: "idView1",
    //     type: "XML",
    //   });

    //   const oView2 = new sap.ui.view({
    //     viewName: "sap.app.view.View2",
    //     id: "idView2",
    //     type: "XML",
    //   });
    //   oContainer.addPage(oView1);
    //   oContainer.addPage(oView2);

    //   return oView;
    // },
    destroy: function () {
      console.log("destroy");
    },
  });
});
