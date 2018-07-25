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

    /// <summary>
    /// Start listening for input
    /// </summary>
    /// <remarks>
    /// Blocking until the communication transport is closed
    /// </remarks>
    public void StartListener()
    {
      JObject data;
      while ((data = ReadJsonFromStdInput()) != null)
      {
        OnInput?.Invoke(this, new InputEventArgs(data["message"].Value<string>()));
      }
    }

    /// <summary>
    /// Send text message over the Native Messaging transport
    /// </summary>
    /// <param name="text">Text message</param>
    public void Output(string text)
    {
      WriteJsonToStdOutput(text);
    }

    #region Helpers

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

    #endregion
  }
}
