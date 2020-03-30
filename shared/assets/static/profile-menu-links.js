/*import { areasServed } from './metros-served-config';*/
const { areasServed } =  require('./metros-served-config').default;

export default {
  "menu" : {
    "desktop" : {
      "profilelinks": [
        {
          "name": "MYPROFILE",
          "icon": "pe-7s-id",
          "link": "profile",
          "route": "/profile"
        },
        {
          "name": "MYLISTINGS",
          "icon": "pe-7s-menu",
          "link": "profile",
          "route": "/profile/listings"
        },
        {
          "name": "MYAPPLICATIONS",
          "icon": "pe-7s-note2",
          "link": "profile",
          "visibility": "none",
          "route": "/profile/applications"
        },
        {
          "name": "MYPORTFOLIO",
          "icon": "pe-7s-home",
          "link": "profile",
          "route": "/profile/portfolio"
        },
        {
          "name": "MYRETURNS",
          "icon": "pe-7s-analyze-returns",
          "link": "profile",
          "route": "/profile/returns"
        },
        {
          "name": "MYSEARCHES",
          "icon": "pe-7s-search",
          "link": "profile",
          "route": "/profile/searches"
        },
        {
          "name": "MYARTICLES",
          "icon": "pe-7s-note",
          "link": "profile",
          "route": "/profile/blogs"
        },
        {
          "name": "MYQUESTIONS",
          "icon": "pe-7s-ribbon",
          "link": "profile",
          "route": "/profile/questions",
          "visibility": "none"
        },
        {
          "name": "MYCOMPANY",
          "icon": "pe-7s-ribbon",
          "link": "profile",
          "visibility": "none",
          "route" : "/profile/company"
        },
        {
          "name": "MYCONTACTS",
          "icon": "pe-7s-users",
          "link": "profile",
          "route": "/profile/mycontacts"
        },
        {
          "name": "MYWISHLIST",
          "icon": "pe-7s-like",
          "link": "profile",
          "route": "/profile/wishlist"
        },
        {
          "name": "LOGOUT",
          "icon": "pe-7s-power",
          "link": "LOGOUT"
        }
      ],
      "signuplinks" : [
        {
          "name" : "ASBUYERSELLER",
          "link" : "users",
          "icon" : ""
        },
        {
          "name" : "ASREALTOR",
          "link" : "realtors",
          "icon" : ""
        },
        {
          "name" : "ASPROFESSIONAL",
          "link" : "professionals",
          "icon" : ""
        }
      ],
      "hamburgerLinks" : [
        {
          "name" : "HELPMEINVEST",
          "link" : "routelink",
          "route": "/guided-search/investment"
        },
        {
          "name" : "SELECTMETROTOEXPLORE",
          "children" : areasServed.map(area => {
            return {
              "name" : area.label,
              "link" : "analyzemarket",
              "route" : area
            }
          })
        },
        {
          "name" : "ROICALCULATOR",
          "link" : "routelink",
          "route": "/roi-calculator"
        },
        {
          "name" : "ANALYZEPORTFOLIO",
          "link" : "routelink",
          "route": "/analyze-portfolio"
        },
        {
          "name" : "BLOGS",
          "link" : "routelink",
          "route": "/blogs"
        },
        {
          "name" : "CREATELISTING",
          "link" : "createlist"
        },
        {
          "name" : "HELP",
          "link" : "routelink",
          "route": "/ask-a-question",
          "visibility": "none"
        },
        {
          "name" : "POSTANARTICLE",
          "link" : "postarticle",
          "visibility": "none"
        },
        {
          "name" : "FAQ",
          "link" : "routelink",
          "route": "/frequently-asked-questions"
        },
        {
          "name" : "ABOUTUS",
          "link" : "routelink",
          "route": "/about-us"
        },
        {
          "name" : "SENDSITEFEEDBACK",
          "link" : "contactus"
        },
        {
          "name" : "PRIVACYPOLICY",
          "link" : "routelink",
          "route": "/privacy-policy"
        },
        {
          "name" : "TERMSCONDITIONS",
          "link" : "routelink",
          "route": "/terms-conditions"
        },
        {
          "name" : "HOME",
          "link" : "home",
          "route": "/"
        }
      ]
    },
    "mobile" : [
      {
        "name" : "LOGINHEADING",
        "link" : "login",
        "loggedin" : false,
        "visibility" : "none"
      },
      {
        "name": "MYPROFILE",
        "link": "profile",
        "route": "/profile",
        "visibility" : "none",
        "loggedin": true
      },
      {
        "name": "MYLISTINGS",
        "link": "profile",
        "route": "/profile/listings",
        "visibility" : "none",
        "loggedin" : true
      },
      {
        "name": "MYSEARCHES",
        "link": "profile",
        "route": "/profile/searches",
        "visibility" : "none",
        "loggedin" : true
      },
      {
        "name": "MYCOMPANY",
        "link": "profile",
        "visibility" : "none",
        "route" : "/profile/company",
        "loggedin" : true
      },
      {
        "name": "MYCONTACTS",
        "link": "profile",
        "route": "/profile/mycontacts",
        "visibility" : "none",
        "loggedin" : true
      },
      {
        "name": "MYARTICLES",
        "link": "profile",
        "route": "/profile/blogs",
        "loggedin": true
      },
      {
        "name": "MYQUESTIONS",
        "link": "profile",
        "route": "/profile/questions",
        "loggedin": true,
        "visibility": "none"
      },
      {
        "name": "MYWISHLIST",
        "link": "profile",
        "route": "/profile/wishlist",
        "visibility" : "none",
        "loggedin": true
      },
      {
        "name" : "HELPMEINVEST",
        "link" : "routelink",
        "route": "/guided-search/investment"
      },
      {
        "name" : "SELECTMETROTOEXPLORE",
        "children" : areasServed.map(area => {
          return {
            "name" : area.label,
            "link" : "analyzemarket",
            "route" : area
          }
        })
      },
      {
        "name" : "ROICALCULATOR",
        "link" : "routelink",
        "route": "/roi-calculator"
      },
      {
        "name" : "ANALYZEMYPORTFOLIO",
        "link" : "routelink",
        "route": "/analyze-portfolio"
      },
      {
        "name" : "BLOGS",
        "link" : "routelink",
        "route": "/blogs"
      },
      {
        "name" : "CREATELISTING",
        "link" : "createlist",
        "visibility": "none"
      },
      {
        "name" : "FAQ",
        "link" : "routelink",
        "route": "/frequently-asked-questions"
      },
      {
        "name" : "ABOUTUS",
        "link" : "routelink",
        "route": "/about-us"
      },
      {
        "name" : "SENDSITEFEEDBACK",
        "link" : "contactus"
      },
      {
        "name" : "PRIVACYPOLICY",
        "link" : "routelink",
        "route": "/privacy-policy"
      },
      {
        "name" : "TERMSCONDITIONS",
        "link" : "routelink",
        "route": "/terms-conditions"
      },
      {
        "name" : "POSTANARTICLE",
        "icon" : "pe-7s-note",
        "link" : "postarticle",
        "visibility": "none"
      },
      {
        "name" : "HELP",
        "icon" : "pe-7s-help1",
        "link" : "help",
        "route": "/ask-a-question",
        "visibility": "none"
      },
      {
        "name" : "LOGOUT",
        "link" : "logout",
        "loggedin" : true,
        "visibility" : "none"
      }
    ]
  }
}
