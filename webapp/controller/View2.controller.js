sap.ui.define(
  [
    "sap/app/controller/BaseController",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
  ],
  function (BaseController, FilterOperator, Filter, MessageBox, MessageToast) {
    "use strict";

    return BaseController.extend("sap.app.controller.View2", {
      myField: null,
      oPopUpCities: null,
      oPopUpSuppliers: null,
      oResource: null,

      onInit: function () {
        console.log("in View2 controller");
        BaseController.prototype.onInit.apply(this);
        this.oRouter.getRoute("view2").attachMatched(this.herculis, this);
        this.oResource = this.getOwnerComponent().getModel("i18n");
      },
      herculis: function (oEvent) {
        const uid = oEvent.getParameter("arguments").uid;
        console.log("aa gaya", uid);
        const relativeFruitPath = `local>/fruits/${uid}`;
        this.getView().bindElement(relativeFruitPath);
      },
      onPageGoToPreviousNavButtonPress: function () {
        // const oNavContainer = this.getView().getParent();
        // oNavContainer.to("idView1");
        this.oRouter.navTo("view1");
      },
      onGoToPreviousButtonPress: function () {
        onPageGoToPreviousNavButtonPress();
      },
      onCityInputValueHelpRequest: function (oEvent) {
        this.myField = oEvent.getSource();
        if (this.oPopUpCities) {
          this.oPopUpCities.open();
          this.oPopUpCities.getBinding("items").filter([]);

          return;
        }

        this.oPopUpCities = new sap.ui.xmlfragment(
          "citiesFragmentId",
          "sap.app.fragments.citieslistpopup",
          this
        );
        const sTitle = this.oResource
          .getResourceBundle()
          .getText("XTIT_CITIES");
        this.oPopUpCities.setTitle(sTitle);
        this.getView().addDependent(this.oPopUpCities);
        this.oPopUpCities.bindAggregation("items", {
          path: "local>/cities",
          template: new sap.m.StandardListItem({
            title: "{local>name}",
            description: "{local>famousFor}",
          }),
        });
        this.oPopUpCities.open();
      },

      onSelectDialogUpdateCityNameConfirm: function (oEvent) {
        const selectedItem = oEvent.getParameter("selectedItem");
        this.myField.setValue(selectedItem.getTitle());
      },
      onButtonSupplierFilterPress: function (oEvent) {
        if (this.oPopUpSuppliers) {
          this.oPopUpSuppliers.open();
          this.oPopUpSuppliers.getBinding("items").filter([]);

          return;
        }

        this.oPopUpSuppliers = new sap.ui.xmlfragment(
          "suppliersFragmentId",
          "sap.app.fragments.supplierlistpopup",
          this
        );
        const sTitle = this.oResource
          .getResourceBundle()
          .getText("XTIT_SUPPLIERS");
        this.oPopUpSuppliers.setTitle(sTitle);
        this.getView().addDependent(this.oPopUpSuppliers);
        this.oPopUpSuppliers.bindAggregation("items", {
          path: "local>/suppliers",
          template: new sap.m.ObjectListItem({
            intro: "{local>city}",
            title: "{local>name}",
            number: "{local>sinceWhen}",
            numberUnit: "{local>contactPerson}",
            icon: "sap-icon://supplier",
          }),
        });
        this.oPopUpSuppliers.open();
      },
      onSelectDialogSupplierSearch: function (oSearchData) {
        const oFilter = new Filter(
          "name",
          FilterOperator.Contains,
          oSearchData.getParameter("value")
        );
        this.oPopUpSuppliers.getBinding("items").filter(oFilter);
      },
      onSelectDialogCitySearch: function (oSearchData) {
        const oFilter = new Filter(
          "name",
          FilterOperator.Contains,
          oSearchData.getParameter("value")
        );
        this.oPopUpCities.getBinding("items").filter(oFilter);
      },
      onSelectDialogFilterSuppliersConfirm: function (oEvent) {
        const selectedItems = oEvent.getParameter("selectedItems");
        if (!selectedItems.length) {
          return;
        }

        const oFilters = [];
        selectedItems.forEach((selectedItem) => {
          const oFilter = new Filter(
            "name",
            FilterOperator.EQ,
            selectedItem.getTitle()
          );
          oFilters.push(oFilter);
        });
        const oFilter = new Filter({
          filters: oFilters,
          and: false,
        });

        this.getView()
          .byId("idSuppliersTable")
          .getBinding("items")
          .filter(oFilter);
      },
      onResetButtonSupplierFilterPress: function () {
        this.getView().byId("idSuppliersTable").getBinding("items").filter([]);
      },

      onSaveButtonPress: function (oEvent) {
        MessageBox.confirm("Do you want to save ?", {
          onClose: function (status) {
            if (status === "OK") {
              MessageToast.show("Your order has been saved");
            }
          },
        });
      },

      onSuppliersTableItemPress: function (oEvent) {
        this.getView()
          .getParent()
          .getParent()
          .setLayout(sap.f.LayoutType.ThreeColumnsMidExpanded);
        this.oRouter.navTo("Supplier", {
          supplierId: "Test",
        });
      },
    });
  }
);
