using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WordGame.Controllers
{
    public class studentsController : ApiController
    {
        wordGameDBEntities objAPI = new wordGameDBEntities();

        //get all Images  
        [HttpGet]
        public IEnumerable<wordDetail> Get()
        {

            return objAPI.wordDetails.OrderBy(x => Guid.NewGuid()).Take(5).AsEnumerable();
            //return objAPI.ImageDetails.AsEnumerable().OrderByDescending(item => item.ImageID );    

        }
    }
}
