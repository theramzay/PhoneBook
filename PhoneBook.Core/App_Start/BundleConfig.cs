using System.Web.Optimization;
using System.Web.Optimization.React;

namespace PhoneBook.Core
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Scripts/dropzone/basic.min.css",
                "~/Scripts/dropzone/dropzone.min.css"
                ).Include(
                "~/font-awesome/css/font-awesome.min.css", new CssRewriteUrlTransform()));

        }
    }
}