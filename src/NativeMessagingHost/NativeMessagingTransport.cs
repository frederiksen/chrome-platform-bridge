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
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace NativeMessagingHost
{
  internal class NativeMessagingTransport
  {
    public delegate void InputEventHandler(
      object sender,
      InputEventArgs args);

    public event InputEventHandler OnInput;

    public void StartListener()
    {
      JObject data;
      while ((data = ReadJsonFromStdInput()) != null)
      {
        OnInput?.Invoke(this, new InputEventArgs(data["message"].Value<string>()));
      }
    }

    public void Output(string text)
    {
      WriteJsonToStdOutput(text);
    }

    private static JObject ReadJsonFromStdInput()
    {
      var stdin = Console.OpenStandardInput();
      var lengthBytes = new byte[4];
      stdin.Read(lengthBytes, 0, 4);
      var length = BitConverter.ToInt32(lengthBytes, 0);
      var buffer = new char[length];
      using (var reader = new StreamReader(stdin))
      {
        while (reader.Peek() >= 0)
        {
          reader.Read(buffer, 0, buffer.Length);
        }
      }
      return JsonConvert.DeserializeObject<JObject>(new string(buffer));
    }

    private static void WriteJsonToStdOutput(JToken data)
    {
      var json = new JObject {["message"] = data};
      var bytes = System.Text.Encoding.UTF8.GetBytes(json.ToString(Formatting.None));
      var stdout = Console.OpenStandardOutput();
      stdout.WriteByte((byte)((bytes.Length >> 0) & 0xFF));
      stdout.WriteByte((byte)((bytes.Length >> 8) & 0xFF));
      stdout.WriteByte((byte)((bytes.Length >> 16) & 0xFF));
      stdout.WriteByte((byte)((bytes.Length >> 24) & 0xFF));
      stdout.Write(bytes, 0, bytes.Length);
      stdout.Flush();
    }
  }
}