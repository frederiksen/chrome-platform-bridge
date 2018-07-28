using System;
using System.IO;
using System.Threading.Tasks;

namespace NativeMessagingHost
{
    internal class ExampleClass
    {
        static public string Example1()
        {
            var osNameAndVersion = System.Runtime.InteropServices.RuntimeInformation.OSDescription;
            return osNameAndVersion; 
        }

        static public async Task<string> Example2(string text)
        {
            var folderPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
            var fullPath = Path.Combine(folderPath, Guid.NewGuid().ToString());
            using (var outputFile = new StreamWriter(fullPath))
            {
                await outputFile.WriteLineAsync(text);
            }
//            throw new Exception("Something didn't work out");
            return fullPath;
        }
    }
}