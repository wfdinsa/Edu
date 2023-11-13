/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "eduproject/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("eduproject.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                // enable routing View2를 보여주기 위해 UIComponent를 초기화 해야 페이지 라우팅이 가능하다.
                // https://ui5.sap.com/1.120.1/#/api/sap.ui.core.UIComponent%23methods/getRouter
                this.getRouter().initialize();
            }
        });
    }
);