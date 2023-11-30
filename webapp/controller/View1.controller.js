sap.ui.define(
  [
    "sap/app/controller/BaseController",
    "sap/app/utils/formatter",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/FilterOperator",
  ],
  function (
    BaseController,
    Formatter,
    MessageBox,
    MessageToast,
    FilterOperator
  ) {
    "use strict";

    return BaseController.extend("sap.app.controller.View1", {
      formatter: Formatter,
      onInit: function () {
        console.log("in View1 controller");
        BaseController.prototype.onInit.apply(this);
      },
      onButtonGotoNextPress: function () {
        // const oNavContainer = this.getView().getParent();
        // oNavContainer.to("idView2");
        console.log("router", this.oRouter);
        this.oRouter.navTo("view2");
      },
      onOrder: function () {
        MessageBox.confirm("Do you like to confirm the order ?", {
          title: " Confirm order",
          onClose: function (value) {
            if (value === MessageBox.Action.OK) {
              MessageToast.show("order placed successfully");
            } else {
              MessageToast.show("order cancelled");
            }
          },
        });
      },

      onSearchFieldFruitsSearch: function (oEvent) {
        const searchValue = oEvent.getParameter("query");
        const oFilter1 = new sap.ui.model.Filter(
          "name",
          FilterOperator.Contains,
          searchValue
        );
        const oFilter2 = new sap.ui.model.Filter(
          "type",
          FilterOperator.Contains,
          searchValue
        );
        const oFilter = new sap.ui.model.Filter({
          filters: [oFilter1, oFilter2],
          and: false,
        });

        const oFruitsList = this.getView().byId("idFruitsList");
        oFruitsList.getBinding("items").filter(oFilter);
      },
      onFruitsListItemSelectionChange: function (oEvent) {
        const selectedItem = oEvent.getParameter("listItem");
        const path = selectedItem.getBindingContextPath();
        const index = path.split("/")[path.split("/").length - 1];
        console.log(oEvent, index);
        this.getView()
          .getParent()
          .getParent()
          .setLayout(sap.f.LayoutType.TwoColumnsMidExpanded);
        this.oRouter.navTo("view2", {
          uid: index,
        });
      },

      onShowSelectedItemsButtonPress: function (oEvent) {
        const oFruitsList = this.getView().byId("idFruitsList");
        const selectedItems = oFruitsList.getSelectedItems();

        selectedItems.forEach((item) => {
          console.log(item.getTitle());
        });
      },

      onFruitsListItemDelete: function (oEvent) {
        const selectedItem = oEvent.getParameter("listItem");
        const path = selectedItem.getBindingContextPath();
        const index = path.split("/")[path.split("/").length - 1];

        const oModel = this.getOwnerComponent().getModel("local");
        const aData = oModel.getProperty("/fruits");

        aData.splice(index, 1);
        oModel.setProperty("/fruits", aData);
      },
    });
  }
);
