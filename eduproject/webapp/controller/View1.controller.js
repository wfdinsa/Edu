sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel" // 다른 컨트롤들을 사전 정의를 해두는 곳
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
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

            }
        });
    });
