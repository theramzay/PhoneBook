using System.Web.Optimization;
using System.Web.Optimization.React;

namespace PhoneBook.Core
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/dropzone/dropzone.min.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.min.js",
                "~/Scripts/Parallax.js",
                "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/site.css",
                "~/Scripts/dropzone/basic.min.css",
                "~/Scripts/dropzone/dropzone.min.css"));
            //bundles.Add(new ScriptBundle("~/bundles/sakura").Include("~/Scripts/Sakura.js"));
            bundles.Add(new ScriptBundle("~/bundles/reactJS").Include(
                "~/Scripts/react/react-0.14.0.min.js",
                "~/Scripts/react/react-dom-0.14.0.min.js"));

            bundles.Add(new BabelBundle("~/bundles/reactApp").Include(
                "~/Scripts/views/Modals.jsx",
                "~/Scripts/views/buttons.jsx",
                "~/Scripts/views/MainPage.jsx",
                "~/Scripts/views/ProfilePage.jsx",
                "~/Scripts/views/SearchPage.jsx"
                ));

            bundles.Add(new StyleBundle("~/Creative/css").Include(
                "~/Content/creative/bootstrap.min.css",
                "~/Content/creative/animate.min.css",
                "~/Content/creative/creative.css"
                ));

            bundles.Add(new ScriptBundle("~/Creative/js").Include(
    "~/Scripts/Parallax.js",
    "~/Content/creative/bootstrap.min.js",
    "~/Content/creative/jquery.easing.min.js",
    "~/Content/creative/jquery.fittext.js",
    "~/Content/creative/wow.min.js",
    "~/Content/creative/creative.js"
    ));
        }
    }
}