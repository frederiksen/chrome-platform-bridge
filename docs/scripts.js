/*
MIT License

Copyright (c) 2018 Morten Frederiksen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(async function() {
    $("#preflight-check-btn").click(async function () {
        $("#check-spinner").show();
        $("#preflight-check-btn").prop('disabled', true);
        $("#system-ready-alert").hide();
        $("#system-not-ready-alert").hide();        
        const bridge = new ChromePlatformBridge();
        const result = await bridge.systemCheck();
        $("#check-spinner").hide();
        $("#preflight-check-btn").prop('disabled', false);
        if (result===true) {
            $("#system-ready-alert").show();
        } else {
            $("#system-not-ready-alert").show();
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