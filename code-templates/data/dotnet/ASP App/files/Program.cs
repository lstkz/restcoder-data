using Microsoft.Owin.Hosting;
using Owin;
using System;
using System.IO;
using System.Net.Http;
using System.Reflection;
using System.Threading;
using System.Web.Http; 

namespace App
{
    class Program
    {
        static void Main(string[] args)
        {
            var port = Environment.GetEnvironmentVariable("PORT") == null ?
                8080 : int.Parse(Environment.GetEnvironmentVariable("PORT"));
            WebApp.Start<App>(new StartOptions
            {
                Port = port,
                ServerFactory = "Nowin"
            });
            Console.WriteLine("Listening on " + port);
            Console.WriteLine("READY");

            Thread.Sleep(Timeout.Infinite);
        }
    }

    class App
    {
        public void Configuration(IAppBuilder app)
        {
            //setup web api
            var config = new HttpConfiguration();
            config.Routes.MapHttpRoute(
                "Default", "{controller}/{action}",
                new { action = "Index" });
            app.UseWebApi(config);
        }
    }

    // your app goes here
    // http://www.asp.net/web-api
}
