// View를 만들면 manifest.json에 가서 Routes와 targets를 계속 추가해줘야한다.
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel", // 다른 컨트롤들을 사전 정의를 해두는 곳
    "sap/m/MessageBox",
    'sap/ui/core/Fragment'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, Fragment) {
        "use strict";

        return Controller.extend("eduproject.controller.View2", {
            //onInit은 DOM이 생성될 때, 한번만 생성된다. 그래서 View1에서 View2로 갔다가 View1으로 돌아가면 데이터가 남아있다.
            onInit: function () {

                // view2가 화면에 나타날때마다 initPage(따로 만들어야함)를 실행하라.
                this.getOwnerComponent().getRouter().getRoute("RouteView2").attachPatternMatched(this.initPage, this);

                // initPage 함수로 옮겼다.
            },
            initPage: function(){
                // JSONModel은 Constructor를 보면 두가지 파라미터가 있는데 optional이라 안넣고 생성.
                let oModel = new JSONModel();

                let vModelData = {
                    gradeList : [{code: "SA", text: "SA 급"},{code: "S", text: "S 급"},{code: "A", text: "A 급"},{code: "M", text: "M1 급"}],
                    condition : {
                        // default값을 지정.
                        grade : "S",
                        name : "홍",
                        department : ""
                    },
                    resultList : []
                }

                oModel.setData(vModelData);

                //바인딩을 하기위해서 setModel을 해줘야한다.
                this.getView().setModel(oModel); // Default인 view1에다가 oModel을 세팅하겠다라는 의미이다.
            },
            gotoView1: function(oEvent){
                // this는 controller 컨트롤러는 sap/ui/core/mvc/Controller이다.
                // rounter는 UIComponent에서 가져오는거니까.
                let oRouter = this.getOwnerComponent().getRouter();
                // 이름은 manifest.json에 들어가있는 route의 name을 넣으면 된다.
                oRouter.navTo("RouteView1");
            }
            
        });
    });
