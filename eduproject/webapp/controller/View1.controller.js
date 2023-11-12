sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel", // 다른 컨트롤들을 사전 정의를 해두는 곳
    "sap/m/MessageBox", // onDelete
    'sap/ui/core/Fragment'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,MessageBox,Fragment) {
        "use strict";

        return Controller.extend("eduproject.controller.View1", {
            //컨트롤러가 가지고 있는 기본적인 메서드, on으로 시작하는 메서드가 3개가 있다.
            //onInit은 DOM이 생성될 때, 한번 만 생성된다.
            onInit: function () {
                // JSONModel은 SDK Constructor를 보면 두가지 파라미터가 있는데 optional속성이라 없이 생성 가능.
                let oModel = new JSONModel();

                let vModelData = {
                    // View에서 Select에 item으로 넣어줬던 값을 Controller에서 불러오도록 변경.
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
                this.getView().setModel(oModel);

            },

            onChangeGrade: function(oControlEvent){
                let oModel = this.getView().getModel(); // 뷰에 세팅된 모델 가져와서 보여주기
                console.log("Change grade:", oModel.getProperty("/condition/grade")); // oModel 내 setData시킨 vModelData를 가져오기.
            },

            onSearch: function(oControlEvent){
                let oModel = this.getView().getModel();

                let vResultList = [];

                for(let i=0;i<10;i++){
                    vResultList.push(({firstName: "길동"+(i+1),lastName: "홍",department:"IS팀",grade:"A급"}));
                }

                oModel.setProperty("/resultList", vResultList);

            },

            onDelete: function(oControlEvent){
                // 클릭한 delete icon을 가져오고, 그 icon의 바인딩 정보를 가져올거다.
               let oControl = oControlEvent.getSource();

               let oContext = oControl.getBindingContext();

               console.log("Context is ", oContext); // sPath라는 정보를 통해서 row의 정보를 알 수 있다.

               let oModel = this.getView().getModel();

               console.log("Selected Row Data is ", oModel.getProperty(oContext.sPath));
               console.log("Selected Row Data is ", oModel.getProperty(oContext.sPath)['firstName']);

               //삭제하시겠습니까 message box만들기
               MessageBox.confirm(oContext.sPath + " 번째 데이터를 삭제하시겠습니까?");
            },

            onHelp: function(oControlEvent){
                // create dialog lazily
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "eduproject.view.fragment.Help" // project이름
                    });
                } 
                // open dialog
                this.pDialog.then(function(oDialog) {
                    oDialog.open();
                });
            },
            onCloseHelp: function(oControlEvent){
                // note: We don't need to chain to the pDialog promise, since this event-handler
                // is only called from within the loaded dialog itself.
                // this.byId("helloDialog").close(); 이번에는 this.pDialog를 선언했으니까 다른 방식으로 해보자
                if(this.pDialog){
                    this.pDialog.then(function(oDialog){
                        oDialog.close();
                    })
                }
            }
        });
    });
