using System;

namespace NativeMessagingHost
{
    internal class InputEventArgs : EventArgs
    {
        public string Text { get; }

        public InputEventArgs(string text)
        {
            Text = text;
        }
    }
}