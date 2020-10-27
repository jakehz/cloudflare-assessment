// Jacob Hernandez
// UC Davis Computer Science '21
// jakejhdz@gmail.com 

const Router = require('./router')

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  /**
   * Respond to the request
   * @param {Request} request
   */
  
  class LinksTransformer {
    constructor(links) {
      this.links = links
    }
    
    async element(element) {
      this.links.forEach((elem) => {
        element.append("<a href=\"" + elem.link + "\">" + elem.name + "</a>", {html:true})
      })
    }
  }

  // for transforming the attribute of a specific tag 
  class AttributeTransformer {
    constructor(attribute, value){
      this.attribute = attribute
      this.value = value
    }
    async element(element) {
      element.setAttribute(this.attribute, this.value)
    }
  }


  async function handleRequest(request) {
    const r = new Router()

    // return the links as a response
    r.get("/links", links)
    r.get("/sociallinks",socialLinks)
    let response = await r.route(request)
    if (response.status == 404){
      try {
          let arr = []
          // the json() function for a response doesn't return json,
          // it returns a promise that can be used when the data is 
          // accessible. this must be accessed using the "then" member function
          links().json().then(data => {
            arr = data
          })

          let social = []
          socialLinks().json().then(data=>{
            social = data
          })
          response = await fetch("https://static-links-page.signalnerve.workers.dev")
          let imgLink = "https://media-exp1.licdn.com/dms/image/C5603AQH1dL35hqgXIg/profile-displayphoto-shrink_200_200/0?e=1609372800&v=beta&t=NclQIAjfNQN53TKnfWLfA1xwtDWvxuElF_CRgg4klIg"
          let name = "Jacob Hernandez"
          // HTMLRewriter changes the page to display the content
          response = new HTMLRewriter().on("div#links",new LinksTransformer(arr)).on(
            "img#avatar", new AttributeTransformer("src",imgLink)).on(
            "div#profile", new AttributeTransformer("style","")).on("h1#name", {
              // function to 
              async element(element){element.append(name)}
            }).on(
            "div#social", new LinksTransformer(social)).transform(response)
      } catch(e) {
          console.log(e)
          response = new Response("Not Found", {status:404})
      }
    }
    if (!response) {
      response = new Response("no response", {status:404})
    }
    return response
  }

  function links(){
    let links = [{"name": "Google", "link": "https://www.google.com"}, 
                 {"name":"Yahoo","link":"https://www.yahoo.com"},
                 {"name":"Cloudflare", "link":"https://www.cloudflare.com"}]
    // the links must be stringified before they can be returned in the page as a response
    return new Response(JSON.stringify(links,null, 2), {headers:{"Content-Type": "application/json"}})
  }

  function socialLinks() {
    let links = [{"name": "Twitter", "link": "https://www.twitter.com/jakehrz"}, 
                 {"name":"Facebook","link":"https://www.facebook.com/profile.php?id=100011431864887"},
                 {"name":"Github", "link":"https://www.github.com/jakehz"}]
    // the links must be stringified before they can be returned in the page as a response
    return new Response(JSON.stringify(links,null, 2), {headers:{"Content-Type": "application/json"}})
  }