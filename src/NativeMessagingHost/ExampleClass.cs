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

        static public async Task<string> Example2(string filename, string text)
        {
            var folderPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
            var fullPath = Path.Combine(folderPath, filename);
            using (var outputFile = new StreamWriter(fullPath))
            {
                await outputFile.WriteLineAsync(text);
            }
            return fullPath;
        }
    }
}