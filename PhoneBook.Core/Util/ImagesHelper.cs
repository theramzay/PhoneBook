using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;

namespace PhoneBook.Core.Util
{
    public class ImagesHelper
    {
        public static void ToTmb(string path, string tmbpath)
        {
            var thumb = Image.FromFile(path).GetThumbnailImage(250, 250, () => false, IntPtr.Zero);
            var myEncoderParameters = new EncoderParameters(3) //saving file to progressive jpg
            {
                Param =
                {
                    [0] = new EncoderParameter(Encoder.Quality, 100L),
                    [1] = new EncoderParameter(Encoder.ScanMethod, (int) EncoderValue.ScanMethodInterlaced),
                    [2] = new EncoderParameter(Encoder.RenderMethod, (int) EncoderValue.RenderProgressive)
                }
            };
            thumb.Save(tmbpath, GetEncoder(ImageFormat.Jpeg), myEncoderParameters);
        }

        private static ImageCodecInfo GetEncoder(ImageFormat format)
        {
            return ImageCodecInfo.GetImageDecoders().FirstOrDefault(codec => codec.FormatID == format.Guid);
        }
    }
}