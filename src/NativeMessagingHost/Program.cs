using System;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NativeMessagingHost
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                var nativeMessagingCommunication = new NativeMessagingTransport();
                nativeMessagingCommunication.OnInput += async (s, a) =>
                {
                    var definition = new { id = "", method = "" };
                    var obj = JsonConvert.DeserializeAnonymousType(a.Text, definition);
                    string result = await Task.Run(async () => 
                    { 
                        if (obj.method == "example1")
                        {
                            var osNameAndVersion = System.Runtime.InteropServices.RuntimeInformation.OSDescription;
                            return osNameAndVersion; 
                        }
//                        await Task.Delay(2500);
                        return Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
                    });

                    var newObj = new { obj.id, Result = result /*, Time = DateTime.UtcNow*/ };
                    string json = JsonConvert.SerializeObject(newObj, Formatting.Indented);
                    nativeMessagingCommunication.Output(json);
                };

                nativeMessagingCommunication.StartListener();

            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
