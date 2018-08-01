// DOM loaded
(async function() {
    $("#preflight-check-btn").click(async function () {
        try {
            $("#check-spinner").show();
            $("#preflight-check-btn").prop('disabled', true);
            $("#system-ready-alert").hide();
            $("#system-not-ready-alert").hide();        
            const bridge = new ChromePlatformBridge();
            var result = await bridge.invoke({method:"example1"});
            $("#system-ready-alert").show();
        }
        catch(err) {
            $("#system-not-ready-alert").show();
        }
        finally {
            $("#check-spinner").hide();
            $("#preflight-check-btn").prop('disabled', false);
        }
    });
    $("#invoke-example1-btn").click(async function () {
        try {
            $("#invoke-example1-btn").prop('disabled', true);
            $("#example1-result").text("-");    
            $("#example1-spinner").show();    
            const bridge = new ChromePlatformBridge();
            const result = await bridge.invoke({method:"example1"});
            $("#example1-result").text(result);    
        }
        catch(err) {
            alert(err);
        }
        finally {
            $("#invoke-example1-btn").prop('disabled', false);
            $("#example1-spinner").hide();    
        }
    });

    $("#invoke-example2-btn").click(async function () {
        try {
            $("#invoke-example2-btn").prop('disabled', true);
            $("#example2-result").text("-");    
            $("#example2-spinner").show();    
            const filenameInput = $("#filenameInput").val();
            const textInput = $("#textInput").val();
            const bridge = new ChromePlatformBridge();
            const result = await bridge.invoke({method:"example2", filename: filenameInput, text: textInput});
            $("#example2-result").text(result);
        }
        catch(err) {
            alert(err);
        }
        finally {
            $("#invoke-example2-btn").prop('disabled', false);
            $("#example2-spinner").hide();    
        }

    });
})();