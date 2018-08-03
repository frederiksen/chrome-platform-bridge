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
using System;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NativeMessagingHost
{
    class Program
    {
        static string Version = "1.0.0";

        static void Main(string[] args)
        {
            var nativeMessagingCommunication = new NativeMessagingTransport();
            nativeMessagingCommunication.OnInput += async (s, i) =>
            {
                var definition = new { id="", method="", requestedHostVersion="" };
                var obj = JsonConvert.DeserializeAnonymousType(i.Text, definition);
                object result = null;
                try
                {
                    result = await Task.Run(async () => 
                    { 
                        if (obj.method == "systemCheck")
                        {
                            return "ready";
                        }
                        if (obj.requestedHostVersion != Version)
                        {
                            throw new Exception($"Incorrect host version: {Version}");
                        }
                        if (obj.method == "example1")
                        {
                            return ExampleClass.Example1();
                        }
                        if (obj.method == "example2")
                        {
                            var parameterDefinition = new { filename = "", text = "" };
                            var parameterObj = JsonConvert.DeserializeAnonymousType(i.Text, parameterDefinition);
                            return await ExampleClass.Example2(parameterObj.filename, parameterObj.text);
                        }
                        throw new Exception("Unknown method");
                    });
                }
                catch (System.Exception exception)
                {
                    // Report the expcetion to the sender
                    string errorJson = JsonConvert.SerializeObject(new { obj.id, Error = exception.Message });
                    nativeMessagingCommunication.Output(errorJson);
                    return;
                }
                string json = JsonConvert.SerializeObject(new { obj.id, Result = result });
                nativeMessagingCommunication.Output(json);
            };
            nativeMessagingCommunication.StartListener();
        }
    }
}