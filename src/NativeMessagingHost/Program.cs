using System;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NativeMessagingHost
{
    class Program
    {
        static void Main(string[] args)
        {
            var nativeMessagingCommunication = new NativeMessagingTransport();
            nativeMessagingCommunication.OnInput += async (s, a) =>
            {
                var definition = new { id = "", method = "" };
                var obj = JsonConvert.DeserializeAnonymousType(a.Text, definition);
                object result = null;
                try
                {
                    result = await Task.Run(async () => 
                    { 
                        if (obj.method == "example1")
                        {
                            return ExampleClass.Example1();
                        }
                        if (obj.method == "example2")
                        {
                            var parameterDefinition = new { filename = "", text = "" };
                            var parameterObj = JsonConvert.DeserializeAnonymousType(a.Text, parameterDefinition);

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